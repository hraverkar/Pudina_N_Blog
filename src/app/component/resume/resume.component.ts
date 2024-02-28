import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IResumeInformation } from '../../interface/iresume-information';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [MatTooltip, CommonModule],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
})
export class ResumeComponent implements OnInit {
  public resumeBasicInformation: IResumeInformation;
  public constructor(
    private basicInfoService: BasicInfoService,
    private spinnerService: NgxSpinnerService
  ) {}
  public ngOnInit(): void {
    this.getResumeBasicDetails();
  }

  public onDonwloadResumeClick(): void {
    this.spinnerService.show();
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
      this.spinnerService.hide();
    });
  }

  private getResumeBasicDetails(): void {
    this.spinnerService.show();
    this.basicInfoService
      .resumeBasicInformation()
      .subscribe((res: IResumeInformation) => {
        if (res !== undefined || res !== null) {
          this.resumeBasicInformation = res;
        }
        this.spinnerService.hide();
      });
  }
}
