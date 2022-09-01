import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { ThingsService } from '../services/thingsboard/things.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private thingsService: ThingsService,
    public sanitizer: DomSanitizer,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login(): void {
    this.loginService.loginbasurl().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (error) => {
        var x = error;
        console.log(error.message);
        // this.errorMessage = error.message;
      },
    });

    //if login success then do login on iframe
    //else return the error received from the api
  }

  submit() {
    if (this.form.valid) {
      this.submitEM.emit(this.form.value);
    }
    this.router.navigate(['home']);
  }
  @Input() error!: string | null;

  @Output() submitEM = new EventEmitter();

  getUser(): void {
    this.thingsService.GetUser();
  }
}
