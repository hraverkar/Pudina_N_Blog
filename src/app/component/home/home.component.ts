import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public BasicInformation: IbasicInforamtion | undefined;
  public constructor(private basicInfoService: BasicInfoService) { }
  public ngOnInit(): void {
    this.basicInfoService.data$.subscribe((res: IbasicInforamtion) => {
      this.BasicInformation = res;
    });
  }
}
