import { Component } from '@angular/core';

import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BeKindRewind';
  showFiller = false;

  window = window;

  constructor(private apiService: ApiService, private router: Router) {}

  logout(): void {
    this.apiService.logoutUser();
    this.router.navigateByUrl("/");
  }
}
