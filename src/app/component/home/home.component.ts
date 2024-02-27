import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  //#region public property
  public BasicInformation: IbasicInforamtion | undefined;
    //#endregion
  //#region public methods
  public constructor(private basicInfoService: BasicInfoService) {}
  public ngOnInit(): void {
    this.basicInfoService.data$.subscribe((res: IbasicInforamtion) => {
      this.BasicInformation = res;
    });
    this.getSalutation();
  }

  public getSalutation(): string {
    const currentHour = new Date().getHours();
    if (currentHour >= 0 && currentHour < 12) {
      return 'Good morning';
    } else if (currentHour >= 12 && currentHour < 16) {
      return 'Good afternoon';
    } else if (currentHour >= 16 && currentHour < 20) {
      return 'Good evening';
    } else {
      return 'Good night';
    }
  }
  //#endregion
}
