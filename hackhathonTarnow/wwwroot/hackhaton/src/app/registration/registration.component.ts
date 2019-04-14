import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


const emailVailidators = [Validators.required, Validators.email];
const numberValidators = [Validators.required, Validators.pattern('^[0-9]*$')];
const requiredValidators = [Validators.required];

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

export class RegistrationComponent implements OnInit {

  //  registrationForm = new FormGroup({
  //   Name: new FormControl('', requiredValidators),
  //   Surname: new FormControl('', requiredValidators),
  //   Phone: new FormControl('', numberValidators),
  //   Email: new FormControl('', emailVailidators),
  //   // Password: new FormControl(''),
  //   // CartID: new FormControl(''),
  // });

  emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  numberFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]);
  NameFormControl = new FormControl('', [
      Validators.required
    ]);
  SurnameFormControl = new FormControl('', [
      Validators.required
    ]);
  PasswordFormControl = new FormControl('', [
      Validators.required
    ]);

    matcher = new MyErrorStateMatcher();

  constructor() { 


  }

  ngOnInit() {
  }

}
