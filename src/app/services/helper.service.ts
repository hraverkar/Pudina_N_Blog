import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  constructor(private router: Router) {}

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
      case 'utilities':
        this.router.navigate(['/utilities']);
        break;
      case 'utilities/uuid-generator':
        this.router.navigate(['/utilities/uuid-generator']);
        break;
      case 'utilities/hash-generator':
        this.router.navigate(['/utilities/hash-generator']);
        break;
    }
  }
}
