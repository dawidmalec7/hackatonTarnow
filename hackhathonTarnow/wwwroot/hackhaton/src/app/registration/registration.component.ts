import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';

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

  public onFormSubmit(form:NgForm) {
    console.log(form);
    this.http.post(this.app.apiuri+"api/register", form, { responseType: 'text' }).subscribe(resp => {
      console.log(resp);
    });
  
  }
  ngOnInit() {
  }
  IsAccepted:Boolean = false;
  registerForm: FormGroup;  
  Name:string='';  
  Surname:string='';  
  Phone:number=null;   
  Email:string='';  
  Password:string='';  
  CardID: number=null;

constructor(private fb: FormBuilder, private http: HttpClient, private app: AppComponent) {   
  
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
      this.IsAccepted = true;  
    } else {  
      this.IsAccepted = false;  
    }  
  }  
   
}
