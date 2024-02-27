import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss',
})
export class ThemeToggleComponent {
  public isDarkMode: boolean;
  public constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
  }
  public toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
  }
}
