import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { numberOfPlaces } from '../models/NumberOfPlaces';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-symulation',
  templateUrl: './symulation.component.html',
  styleUrls: ['./symulation.component.scss']
})
export class SymulationComponent implements OnInit {

  public parking;
  public spaces;
  constructor(private http: HttpClient, private app: AppComponent) { 
    this.getParking();
  }

  updatePlace(id:string) {
    this.http.put(this.app.apiuri+"api/parking/" + id, {}, {responseType: 'text'}).subscribe(resp => {
      console.log(resp);
      this.getParking();
    });
  }
  getParking(){
    this.http.get(this.app.apiuri+"api/parking").subscribe(resp => {
      console.log(resp);
      this.spaces = resp[0].spaces;
    });
  }

  ngOnInit() {
  }

}
