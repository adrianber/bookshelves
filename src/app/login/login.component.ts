import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../auth/auth.service';

import { HttpClient, HttpHeaders, HttpRequest, HttpEventType, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;
  invalidCredentials: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
        event => {
          if (event.type === HttpEventType.Response) {
            localStorage.setItem('currentUser', JSON.stringify(event.body));
            this.router.navigate([this.returnUrl]);
          }

        },
        error => {
          console.log(error);
          this.loading = false;
          if (error.status === 401) {
            this.invalidCredentials = true;
          }
        });
  }

  textChanged() {
    this.invalidCredentials = false;
  }
}