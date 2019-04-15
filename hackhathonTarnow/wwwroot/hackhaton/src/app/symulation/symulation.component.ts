import { Component, OnInit } from '@angular/core';
import { signalRService } from '../services/signal-r.service';
import { numberOfPlaces } from '../models/NumberOfPlaces';

@Component({
  selector: 'app-symulation',
  templateUrl: './symulation.component.html',
  styleUrls: ['./symulation.component.scss']
})
export class SymulationComponent implements OnInit {

  private signalR: signalRService = new signalRService();

  constructor() { }

  public sendMessage() {
    var x = 15;
    var y = 2;
  
    this.signalR.sendChatMessage(x, y);
  }
  ngOnInit() {
  }

}
