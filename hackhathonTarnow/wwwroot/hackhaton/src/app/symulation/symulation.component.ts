import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-symulation',
  templateUrl: './symulation.component.html',
  styleUrls: ['./symulation.component.scss']
})
export class SymulationComponent implements OnInit {

  public parking;
  public spaces;
  constructor(private http: HttpClient) { 
    this.getParking();
  }

  updatePlace(id:string) {
    this.http.put("https://localhost:5001/api/parking/" + id, {}).subscribe(resp => {
      console.log(resp);
      this.getParking();
    });
  }
  getParking(){
    this.http.get("https://localhost:5001/api/parking").subscribe(resp => {
      console.log(resp);
      this.spaces = resp[0].spaces;
    });
  }
  ngOnInit() {
  }

}
