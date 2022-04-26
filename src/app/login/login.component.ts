import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(email: String, password: String): void {
    if (email.trim() !== '' && password.trim() !== '') {
      this.apiService.loginUser(email, password).subscribe((user: any) => { 
        if (user.user_id) {
          this.apiService.setToken(user.session_token);
          window.sessionStorage.setItem("logged_in", "true");
          this.router.navigateByUrl("/inventory");
        }
      });
    }
  }

}
