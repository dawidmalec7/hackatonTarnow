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
    this.http.put(this.app.apiuri + "api/users", form, { responseType: 'text' }).subscribe(resp => {
      console.log(resp);
    });
  }

  public userForm;
  ngOnInit() {
  }
  IsAccepted: Boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient, private app: AppComponent) {
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      Surname: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Email: [{ value:'', disabled: true }, Validators.required],
      Password: ['', Validators.required],
      DefaultPlate: ['', Validators.required],
      CardId: ['']
    });
    this.http.get("https://localhost:5001/api/users").subscribe(resp => {
      // To initialize FormGroup
      console.log(resp);
      this.userForm = this.fb.group({
        Name: [(<any>resp).name, Validators.required],
        Surname: [(<any>resp).surname, Validators.required],
        PhoneNumber: [(<any>resp).phoneNumber, Validators.required],
        Email: [{ value: (<any>resp).email, disabled: true }, Validators.required],
        DefaultPlate: [ (<any>resp).plate],
        Password: ['', Validators.required],
        CardId: ['']
      })
    });


  }
}
