import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {

  isActivated: boolean = false;
  constructor(private ac: ActivatedRoute, private http: HttpClient) {
    var userId: string = this.ac.snapshot.params.id;

    this.http.put("", {}, { responseType: "text" }).subscribe(resp => this.isActivated = true,
    err => this.isActivated = false);
  }

  ngOnInit() {
  }

}
