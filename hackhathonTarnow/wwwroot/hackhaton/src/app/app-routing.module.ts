import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MapComponent } from './map/map.component';
import { RegistrationComponent } from './registration/registration.component';
import { ClientPanelComponent } from './client-panel/client-panel.component';
import { SymulationComponent } from './symulation/symulation.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'info', component: InfoComponent },
  { path: 'map', component: MapComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'clientPanel', component: ClientPanelComponent },
  { path: 'simulation', component: SymulationComponent },
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
