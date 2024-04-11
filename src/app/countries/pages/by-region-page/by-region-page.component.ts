import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { Region } from '../../interfaces/Region';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent implements OnInit {
  constructor(private countriesService:CountriesService){ }
  public countries:Country[] = [];

public regions:Region[] = ["Americas","Africa","Asia","Europe","Oceania"];
@Input()
  public selectedRegion?:Region;
ngOnInit(): void {
    this.countries = this.countriesService.cashStore.byRegion.countries
    this.selectedRegion =  this.countriesService.cashStore.byRegion.region
}
  searchByRegion(region:Region):void{
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
    .subscribe(
      countries => this.countries = countries
    )
  }
}
