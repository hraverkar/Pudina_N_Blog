import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AboutComponent } from '../../../component/about/about.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUtilitiesInformation } from '../../../interface/iutilities-information';
import { ContributionService } from '../../../services/contribution.service';
import { HelperService } from '../../../services/helper.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';
import { v4 as uuidv4 } from 'uuid';
import { MatRippleModule } from '@angular/material/core';
@Component({
  selector: 'app-guid-generation',
  standalone: true,
  imports: [
    CommonModule,
    AboutComponent,
    FormsModule,
    MatInputModule,
    ClipboardModule,
    MatIconModule,
    MatRippleModule,
  ],
  templateUrl: './guid-generation.component.html',
  styleUrl: './guid-generation.component.scss',
})
export class GuidGenerationComponent {
  public utilitiesInformation: IUtilitiesInformation;
  public uuidValue: string;
  public copyButtonName: string = 'Copy';
  constructor(
    private helperService: HelperService,
    private contributionsService: ContributionService,
    private spinnerService: NgxSpinnerService,
    private clipboard: Clipboard
  ) {}
  ngOnInit(): void {
    this.getResumeBasicDetails();
    this.generateNewID();
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

  public generateNewID() {
    this.uuidValue = uuidv4();
  }

  public copyToClipboard() {
    navigator.clipboard
      .writeText(this.uuidValue)
      .then(() => {
        const originalName = this.copyButtonName;
        this.copyButtonName = 'Copied!';
        setTimeout(() => {
          this.copyButtonName = originalName;
        }, 2000);
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
      });
  }
}
