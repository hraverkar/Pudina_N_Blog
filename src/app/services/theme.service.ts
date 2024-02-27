import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: boolean = false;
  constructor() {}

  public isDarkMode(): boolean {
    return this.darkMode;
  }

  public setDarkMode(isDarkMode: boolean) {
    this.darkMode = isDarkMode;
    if (this.darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
