import { Component, OnInit } from '@angular/core';
import { ContributionsComponent } from '../../component/contributions/contributions.component';
import { AboutComponent } from '../../component/about/about.component';
import { ContributionService } from '../../services/contribution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IResumeInformation } from '../../interface/iresume-information';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { PortfolioComponent } from "../portfolio/portfolio.component";

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [ContributionsComponent, AboutComponent, PortfolioComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
    //#region public property
    public projectBasicInformation: IbasicInforamtion;
    //#endregion

    //#region public methods
    public constructor(
      private contributionsService: ContributionService,
      private spinnerService: NgxSpinnerService
    ) {}
    public ngOnInit(): void {
      this.getResumeBasicDetails();
    }

    private getResumeBasicDetails(): void {
        this.spinnerService.show();
        this.contributionsService
          .readProjectInformation()
          .subscribe((res: IbasicInforamtion) => {
            if (res !== undefined || res !== null) {
              this.projectBasicInformation = res;
            }
            this.spinnerService.hide();
          });
      }
}
