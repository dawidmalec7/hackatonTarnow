import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { InfoComponent } from './info/info.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DefinedPlaces } from './defined-places';
import { MapStyle } from './map-style';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MapComponent } from './map/map.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    InfoComponent,
    PageNotFoundComponent,
    MapComponent,
    RegistrationComponent,
    ClientPanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    //material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ],
  providers: [DefinedPlaces, MapStyle],
  bootstrap: [AppComponent]
})
export class AppModule { }
