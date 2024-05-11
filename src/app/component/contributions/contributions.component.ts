import { Component, OnInit } from '@angular/core';
import { ContributionService } from '../../services/contribution.service';
import { environment } from '../../../environments/environment.development';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contributions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contributions.component.html',
  styleUrl: './contributions.component.scss',
})
export class ContributionsComponent implements OnInit {
  public contributionTable: any; // Change the type to match your contribution table
    constructor(private _contributionsService: ContributionService) {}

  ngOnInit(): void {
    this.fetchGitHubContributions();
  }

  fetchGitHubContributions() {
    const query = `
      query {
        user(login: "${environment.userName}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  contributionCount
                  date
                }
              }
            }
          }
        }
      }
    `;
    this._contributionsService.ContributionsInformation(query).subscribe(
    //this.http.post<any>(this.apiUrl, { query }, { headers }).subscribe(
        (data) => {
            const contributions = data.data.user.contributionsCollection.contributionCalendar;
        const weeks = contributions.weeks;

        // Create the table structure based on contributions data
        this.contributionTable = [];
        for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
          const row = [];
          for (let weekIndex = 0; weekIndex < 53; weekIndex++) {
            const week = weeks[weekIndex];
            const contributionDay = week.contributionDays[dayOfWeek];
            const contributionCount = contributionDay ? contributionDay.contributionCount : 0;
            let contributionColor;
            if (contributionCount < 5) {
              contributionColor = 0;
            } else if (contributionCount < 10) {
              contributionColor = 1;
            } else if (contributionCount < 15) {
              contributionColor = 2;
            } else if (contributionCount < 20) {
              contributionColor = 3;
            } else {
              contributionColor = 4;
            }
            row.push(contributionColor);
          }
          this.contributionTable.push(row);
        }
      }, error => {
        console.error("Error fetching GitHub contributions:", error);
      });

  }
}
