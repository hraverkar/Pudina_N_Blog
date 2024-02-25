import { Component, OnInit } from '@angular/core';
import { BasicInfoService } from '../../services/basic-info.service';
import { IbasicInforamtion } from '../../interface/ibasic-inforamtion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  //#region public properties
  public BasicInformation: IbasicInforamtion | undefined;

  //#endregion 
  //#region public methods
  public constructor(public basicInformationService: BasicInfoService, public router: Router) { }
  public ngOnInit(): void {
    this.LoadbasicInformation();
  }

  public clickSocialMedia(value: string): void {
    switch (value) {
      case "email":
        window.open("mailto:" + this.BasicInformation?.authorEmail, '_blank');
        break;
      case "github":
        window.open("https://github.com/" + this.BasicInformation?.authorGithub, '_blank');
        break;
      case "linkedin":
        window.open("https://linkedin.com/in/" + this.BasicInformation?.authorLinkedin, '_blank');
        break;
      case "google":
        window.open(this.BasicInformation?.authorGoogle, '_blank');
        break;
      default:
        break;
    }
  }

  public navigateTo(value: string): void {
    switch (value) {
      case "resume":
        this.router.navigate(['/resume']);
        break;
      case "blog":
        this.router.navigate(['/blog']);
        break;
      case "home":
        this.router.navigate(['/home']);
        break;
    }
  }

  //#endregion

  //#region private methods

  private LoadbasicInformation(): void {
    this.basicInformationService.readBasicInformation().subscribe((res) => {
      if (res !== undefined || res !== null) {
        this.BasicInformation = res;
      }
    });
  }
  //#endregion

}
