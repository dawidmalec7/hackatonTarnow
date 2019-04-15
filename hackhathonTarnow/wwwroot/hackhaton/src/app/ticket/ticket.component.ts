import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss']
})

export class TicketComponent implements OnInit {
  buyed = false;
  isPremium: boolean;
  ticket = JSON.parse(localStorage.getItem('ticket')) || null;
  timesPremium = [
    { time: 30, price: 0.80 },
    { time: 60, price: 2 },
    { time: 120, price: 4.10 },
    { time: 180, price: 6.4 },
    { time: 240, price: 8.4 }];
  timesStandard = [
    { time: 30, price: 1 },
    { time: 60, price: 2.5 },
    { time: 120, price: 5.10 },
    { time: 180, price: 8 },
    { time: 240, price: 10 }];;
  times;
  now;
  ticketForm: FormGroup;
  Plate: string = '';
  Price: number = 0;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    //ifpremium
    this.buyed = (this.ticket == null) ? false : true;
    if (this.buyed) this.ticket.time = new Date(this.ticket.time);
    this.times = this.timesPremium;
    this.ticketForm = this.fb.group({
      Plate: ['', Validators.required],
      Price: ['', Validators.required]
    })
    this.now = new Date();
    setInterval(() => {
      this.now = new Date();
      if ((this.ticket.time - this.now) < 0) {
        localStorage.removeItem('ticket');
        this.buyed = false;
      }
    }, 1000);
  }
  onFormSubmit(form) {
    console.log(form);
    this.buyed = true;
    var d = new Date();
    var v = new Date();
    v.setMinutes(d.getMinutes() + form.Price.time);
    this.ticket = {
      plate: form.Plate,
      time: v,
      price: form.Price.price
    }
    localStorage.setItem('ticket', JSON.stringify(this.ticket));
  }
  ngOnInit() {
    this.http.get("https://localhost:5001/api/users").subscribe(resp => console.log(resp))
  }
  
}
