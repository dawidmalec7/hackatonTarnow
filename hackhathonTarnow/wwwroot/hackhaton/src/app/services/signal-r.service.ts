import { EventEmitter, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { numberOfPlaces } from '../models/numberOfPlaces';

@Injectable({
  providedIn: 'root'
})

export class signalRService {
  messageReceived = new EventEmitter<numberOfPlaces>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
  }

  public sendChatMessage(numberOfFreePlaces: number, numberOfFreeDisabledPlaces: number) {
    this._hubConnection.invoke('SendNumberOfFreePlaces', numberOfFreePlaces);
  }

  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:5001/count")
      .build();

    this.startConnection();
  }
  private startConnection(): any {
    this._hubConnection
      .start()
      .then(() => {
        this.connectionIsEstablished = true;
        console.log('Hub connection started');
        this.connectionEstablished.emit(true);
      })
      .catch(err => {
        console.log('Error while establishing connection, retrying...');
        setTimeout(this.startConnection(), 5000);
      });
  }

  private registerOnServerEvents(): void {
    this._hubConnection.on('ReceiveMessage', (data: any) => {
      this.messageReceived.emit(data);
      console.log(data); 
    });
  }  
}
