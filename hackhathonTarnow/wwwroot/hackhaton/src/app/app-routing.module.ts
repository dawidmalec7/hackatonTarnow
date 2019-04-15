import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { AttributionComponent } from './attribution/attribution.component';
import { SimulationComponent } from './simulation/simulation.component';
import { ActivationComponent } from './activation/activation.component';
import { SpacesComponent } from './simulation/spaces/spaces.component';
import { TicketComponent } from './ticket/ticket.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'clientPanel', component: ClientPanelComponent },
  { path: 'attribution', component: AttributionComponent },
  { path: 'simulation', component: SimulationComponent },
  { path: 'activation/:id', component: ActivationComponent },
  { path: 'ticket', component: TicketComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'space/:id', component: SpacesComponent },
  //{ path: 'works', redirectTo: "works/" },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
