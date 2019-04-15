import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-symulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  public parkings;
  public spaces;
  public isSpace;
  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.getParking();
  }

  public chooseParking(id) {
    this.router.navigateByUrl("space/" + id);
  }

  getParking() {
    this.http.get("https://localhost:5001/api/parking").subscribe(resp => {
      console.log(resp);
      this.parkings = resp;
    });
  }
}
