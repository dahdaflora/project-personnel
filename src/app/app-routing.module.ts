import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRegionComponent } from './all-region/all-region.component';
import { AllCountriesComponent } from './all-countries/all-countries.component';
import { SingleCountryComponent } from './single-country/single-country.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';



const routes: Routes = [
  { path: 'home', component: AllRegionComponent },
  { path: 'region/:region', component: AllCountriesComponent },
  { path: 'country/:name', component: SingleCountryComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '*', component: AllRegionComponent },
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents=[AllCountriesComponent,SingleCountryComponent,AllRegionComponent, HeaderComponent,FooterComponent,ContactComponent]
