import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../services/helper.service';
import { AboutComponent } from '../../component/about/about.component';
import { ContributionService } from '../../services/contribution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUtilitiesInformation } from '../../interface/iutilities-information';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-utilities',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  templateUrl: './utilities.component.html',
  styleUrl: './utilities.component.scss',
})
export class UtilitiesComponent implements OnInit {
  public utilitiesInformation: IUtilitiesInformation;
  constructor(
    private helperService: HelperService,
    private contributionsService: ContributionService,
    private spinnerService: NgxSpinnerService
  ) {
    this.getResumeBasicDetails();
  }
  ngOnInit(): void {
  }
  public navigateTo(value: string): void {
    this.helperService.navigateTo(value);
  }

  private getResumeBasicDetails(): void {
    this.spinnerService.show();
    this.contributionsService
      .readUtilitiesInformation()
      .subscribe((res: IUtilitiesInformation) => {
        if (res !== undefined || res !== null) {
          this.utilitiesInformation = res;
        }
        this.spinnerService.hide();
      });
  }
}
