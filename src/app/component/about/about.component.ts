import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  public BasicInformation: IbasicInforamtion;
  constructor(private basicInfoService: BasicInfoService) {}
  public ngOnInit(): void {
    this.basicInfoService.data$.subscribe((res: IbasicInforamtion) => {
      if (res !== undefined || res !== null) {
        this.BasicInformation = res;
      }
    });
  }
}
