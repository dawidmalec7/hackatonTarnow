import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-symulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.scss']
})
export class SimulationComponent implements OnInit {

  public parkings;
  public spaces;
  constructor(private http: HttpClient) { 

  }

  ngOnInit() {
    this.getParking();
  }

  updatePlace(id:string) {
    this.http.put("https://localhost:5001/api/parking/" + id, {}, {responseType: 'text'}).subscribe(resp => {
      console.log(resp);
      this.getParking();
    });
  }

  getParking(){
    this.http.get("https://localhost:5001/api/parking").subscribe(resp => {
      console.log(resp);
      this.parkings = resp; 
    });
  }
}
