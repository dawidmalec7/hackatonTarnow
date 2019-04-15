import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
//import { PwaService } from '../pwa-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  promptEvent;
  constructor(public app: AppComponent, /*public Pwa: PwaService*/) { }

  installPwa(): void {
    //this.Pwa.promptEvent.prompt();
  }

  ngOnInit() {

    //window.addEventListener('beforeinstallprompt', event => {
    //  this.promptEvent = event;
    //});
  }


}
