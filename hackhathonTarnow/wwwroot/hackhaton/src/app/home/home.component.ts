import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  howTo = [
    'Sprawdzasz w aplikacji gdzie znajdziesz <b>wolne miejsce parkingowe</b>',
    'Aplikacja <b>prowadzi Cię</b> na parking',
    'Po zaparkowaniu <b>kupujesz bilet</b> parkingowy'
  ];


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  PasswordFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

  public user = {
    Email: null, password: null
  };
  constructor(private http: HttpClient, private router: Router) {

  }

  public login() {
    this.http.post("https://localhost:5001/api/login", this.user).subscribe(resp => {
      console.log(resp);
      localStorage.setItem("token", (<any>resp).value.token);
      localStorage.setItem("tokenExpires", (<any>resp).value.tokenExpires);
      this.router.navigateByUrl("map");
    });
  }

  ngOnInit() {

  }

}

