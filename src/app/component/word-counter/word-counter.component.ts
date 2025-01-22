import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IUtilitiesInformation } from '../../interface/iutilities-information';
import { ContributionService } from '../../services/contribution.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AboutComponent } from '../about/about.component';

@Component({
  selector: 'app-word-counter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    AboutComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './word-counter.component.html',
  styleUrl: './word-counter.component.scss',
})
export class WordCounterComponent {
  public myForm: FormGroup;
  public utilitiesInformation: IUtilitiesInformation;
  public constructor(
    private contributionsService: ContributionService,
    private spinnerService: NgxSpinnerService,
    private fb: FormBuilder
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
  inputText: string = '';
  characterCount: number = 0;
  wordCount: number = 0;

  updateCounts(): void {
    this.characterCount = this.inputText.length;

    // Split the text by spaces and filter out empty strings to handle multiple spaces
    this.wordCount =
      this.inputText.trim().length > 0
        ? this.inputText.trim().split(/\s+/).length
        : 0;
  }
}
