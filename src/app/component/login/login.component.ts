import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService : AuthService){}

  login(){
    if(this.email == '')
    {
      alert('Please enter email');
      return;
    }
    if(this.password == '')
    {
      alert('Please enter password');
      return;
    }

    this.authService.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }
}
