import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

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
  // emailFormControl = new FormControl('', [
  //     Validators.required,
  //     Validators.email,
  //   ]);
  // numberFormControl = new FormControl('', [
  //     Validators.required,
  //     Validators.pattern('^[0-9]*$'),
  //   ]);
  // NameFormControl = new FormControl('', [
  //     Validators.required
  //   ]);
  // SurnameFormControl = new FormControl('', [
  //     Validators.required
  //   ]);
  // PasswordFormControl = new FormControl('', [
  //     Validators.required
  //   ]);

  //   matcher = new MyErrorStateMatcher();

  // registerForm = this.fb.group({
  //   Name: ['', Validators.required],
  //   Surname: ['', Validators.required],
  //   Phone: ['', Validators.required],
  //   Email: ['', Validators.required],
  //   Password: ['', Validators.required],
  //   //CardID: ['']
  // })
  // sendForm(formdata){
  //   console.log(formdata);

  //   //this.http.post('https://localhost:5001/api/register')
  // }
  // constructor(private http:HttpClient, private fb:FormBuilder) { 
    
  // }

  // ngOnInit() {
  // }
  
  registerForm: FormGroup;  
  Name:string='';  
  Surname:string='';  
  Phone:number=null;   
  Email:string='';  
  Password:string='';  
  CardID: number=null;
  
  constructor(private fb: FormBuilder) {   
  
  
    // To initialize FormGroup  
   this.registerForm = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
      CardID: ['']
    }) 
  
  }  
  
  // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  }  
  
  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    console.log(form);  
  }  
}
