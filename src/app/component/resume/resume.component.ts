import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IResumeInformation } from '../../interface/iresume-information';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [MatTooltip],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {

  public resumeBasicInformation: IResumeInformation;
  public constructor(private basicInfoService: BasicInfoService) { }
  public ngOnInit(): void {
    this.getResumeBasicDetails();
  }
  
  public onDonwloadResumeClick(): void {
    const filePath = this.resumeBasicInformation.resumeFilePath;
    this.basicInfoService.downloadFile(filePath).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'resume.pdf'; // Specify the filename
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  private getResumeBasicDetails(): void {
    this.basicInfoService.resumeBasicInformation().subscribe((res: IResumeInformation) => {
      if (res !== undefined || res !== null) {
        this.resumeBasicInformation = res;
      }
    })
  }
}
