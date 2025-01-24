import { Component } from '@angular/core';
import { IUtilitiesInformation } from '../../interface/iutilities-information';
import { HelperService } from '../../services/helper.service';
import { ContributionService } from '../../services/contribution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AboutComponent } from '../about/about.component';
import { CryptoService } from '../../services/crypto.service';
@Component({
  selector: 'app-json-yml-converter',
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
  templateUrl: './json-yml-converter.component.html',
  styleUrl: './json-yml-converter.component.scss',
})
export class JsonYmlConverterComponent {
  public inputValueJson: string;
  public outputValueYAML: string;
  public utilitiesInformation: IUtilitiesInformation;
  public uuidValue: string;
  public copyButtonName: string = 'Copy';
  public ButtonName: string = 'JS to YAML Generate';
  constructor(
    private cryptoService: CryptoService,
    private contributionsService: ContributionService,
    private spinnerService: NgxSpinnerService
  ) {}
  ngOnInit(): void {
    this.getResumeBasicDetails();
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
  public copyToClipboard() {
    navigator.clipboard
      .writeText(this.outputValueYAML)
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

  public jsToYaml() {
    try {
      const jsonObject = JSON.parse(this.inputValueJson);
      this.outputValueYAML = this.cryptoService.convertToYaml(jsonObject);
    } catch (e) {
      console.error(e);
    }
  }
}
