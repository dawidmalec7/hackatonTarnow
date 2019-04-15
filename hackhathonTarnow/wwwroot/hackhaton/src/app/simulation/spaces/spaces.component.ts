import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss', '../simulation.component.scss']
})
export class SpacesComponent implements OnInit {

  constructor(private ac: ActivatedRoute, private http: HttpClient) { }
  public spaces;
  ngOnInit() {
    var parking: string = this.ac.snapshot.params.id;

    this.getSpaces(parking);

  }

  private getSpaces(id: string) {
    this.http.get("https://localhost:5001/api/spaces/" + id).subscribe(resp => {
      console.log(resp);
      this.spaces = resp;
    });
  }

  public updatePlace(id: string) {
    this.http.put("https://localhost:5001/api/parking/" + id, {}, { responseType: 'text' }).subscribe(resp => {
      console.log(resp);
      var parking: string = this.ac.snapshot.params.id;
      this.getSpaces(parking);
    });
  }


}
