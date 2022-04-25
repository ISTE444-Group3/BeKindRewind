import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
  }

  login(email: String, password: String): void {
    if (email.trim() !== '' && password.trim() !== '') {
      this.apiService.loginUser(email, password).subscribe((user: any) => { console.log(user); this.apiService.setToken(user.session_token); });
    }
  }

}
