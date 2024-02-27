import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements OnInit {
  public BasicInformation: IbasicInforamtion;
  constructor(
    private basicInfoService: BasicInfoService,
    private spinnerService: NgxSpinnerService
  ) {}
  public ngOnInit(): void {
    this.spinnerService.show();
    this.basicInfoService.data$.subscribe((res: IbasicInforamtion) => {
      if (res !== undefined || res !== null) {
        this.BasicInformation = res;
      }
      this.spinnerService.hide();
    });
  }
}
