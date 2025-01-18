import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AboutComponent } from '../about/about.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IUtilitiesInformation } from '../../interface/iutilities-information';
import { ContributionService } from '../../services/contribution.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CryptoService } from '../../services/crypto.service';

@Component({
  selector: 'app-hash-generator',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    ClipboardModule,
    MatIconModule,
    MatRippleModule,
    AboutComponent,
    MatFormFieldModule,
    MatSelectModule,
  ],
  templateUrl: './hash-generator.component.html',
  styleUrl: './hash-generator.component.scss',
})
export class HashGeneratorComponent implements OnInit {
  public copyButtonName: string = 'Copy';
  public encoded_output_value: string = '';
  public algorithem: string[] = [
    'sha256',
    'sha512',
    'md5',
    'pbkdf2',
    'hmac-sha256',
    'hmac-sha512',
  ];

  public output_encoading: string[] = ['Hex', 'Base64', 'Latin1'];
  public selectedAlgo: string = this.algorithem[0];
  public selectedOutput: string = this.output_encoading[0];
  public inputValue: string = '';
  public ButtonName: string = 'Generate Hash';
  public secretKey: string;
  public utilitiesInformation: IUtilitiesInformation;
  public constructor(
    private contributionsService: ContributionService,
    private spinnerService: NgxSpinnerService,
    private cryptoService: CryptoService
  ) {}
  public ngOnInit(): void {
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

  public GenerateHashBtn() {
    this.encoded_output_value = this.cryptoService.GenerateHashBtn1(
      this.selectedAlgo,
      this.selectedOutput,
      this.inputValue,
      this.secretKey
    );
    console.log('New output : ' + this.encoded_output_value);
  }
  public copyToClipboard() {
    navigator.clipboard
      .writeText(this.encoded_output_value)
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
