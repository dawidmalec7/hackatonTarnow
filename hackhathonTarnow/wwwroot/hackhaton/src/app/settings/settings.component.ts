import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public onFormSubmit(form: NgForm) {
    console.log(form);
    this.http.post(this.app.apiuri + "api/register", form, { responseType: 'text' }).subscribe(resp => {
      console.log(resp);
    });

  }
  ngOnInit() {
  }
  IsAccepted: Boolean = false;
  userForm: FormGroup;
  Name: string = '';
  Surname: string = '';
  Phone: number = null;
  Email: string = '';
  Password: string = '';
  CardID: number = null;
  constructor(private fb: FormBuilder, private http: HttpClient, private app: AppComponent) {

    // To initialize FormGroup  
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      Phone: ['', Validators.required],
      Email: [{ value: '', disabled: true }, Validators.required],
      Password: ['', Validators.required],
      CardID: ['']
    })

  }
}
