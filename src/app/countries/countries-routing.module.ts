import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';

const routes:Routes = [
    {
      path:'byCapital',
      component:ByCapitalPageComponent
    },
    {
      path:'byCountry',
      component:ByCountryPageComponent
    },
    {
      path:'byRegion',
      component:ByRegionPageComponent
    },
    {
      path:'by/:id',
      component:CountryPageComponent
    },
    {
      path:'**',
      redirectTo:'byCapital'
    }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class CountriesRoutingModule { }
