import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatTooltipModule, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  //#region public properties
  public BasicInformation: IbasicInforamtion | undefined;

  //#endregion
  //#region public methods
  public constructor(
    private basicInformationService: BasicInfoService,
    private router: Router,
    private spinnerService: NgxSpinnerService
  ) {}
  public ngOnInit(): void {
    this.LoadbasicInformation();
  }

  public clickSocialMedia(value: string): void {
    switch (value) {
      case 'email':
        window.open('mailto:' + this.BasicInformation?.authorEmail, '_blank');
        break;
      case 'github':
        window.open(
          'https://github.com/' + this.BasicInformation?.authorGithub,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          'https://linkedin.com/in/' + this.BasicInformation?.authorLinkedin,
          '_blank'
        );
        break;
      case 'google':
        window.open(this.BasicInformation?.authorGoogle, '_blank');
        break;
      default:
        break;
    }
  }

  public navigateTo(value: string): void {
    switch (value) {
      case 'resume':
        this.router.navigate(['/resume']);
        break;
      case 'blog':
        this.router.navigate(['/blog']);
        break;
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'project':
        this.router.navigate(['/project']);
        break;
    }
  }

  //#endregion

  //#region private methods

  private LoadbasicInformation(): void {
    this.spinnerService.show();
    this.basicInformationService.readBasicInformation().subscribe((res) => {
      if (res !== undefined || res !== null) {
        this.BasicInformation = res;
        this.basicInformationService.generateSelectedData(
          this.BasicInformation
        );
      }
      this.spinnerService.hide();
    });
  }
  //#endregion
}
