import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css']
})
export class ByCountryPageComponent implements OnInit {
  constructor(private countriesService:CountriesService){}
  public countries:Country[] = [];
  ngOnInit(): void {
    this.countries =  this.countriesService.cashStore.byCountry.countries
     this.initialValue = this.countriesService.cashStore.byCountry.term
  }
  @Input()
  public initialValue:string = ""
  searchCountry(term:string):void{
    this.countriesService.searchCountry(term)
    .subscribe(
      countries => {
        this.countries = countries
      console.log(countries);
      }
    )
  }
}
