import { Component, Input, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { pipe } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css']
})
export class ByCapitalPageComponent implements OnInit {
  constructor(private countryService:CountriesService){}
  public countries:Country[] = [];
  public isLoading:boolean = false;
  @Input()
  public initialValue:string = "";

  ngOnInit(): void {
      this.countries =this.countryService.cashStore.byCapital.countries;
      this.initialValue = this.countryService.cashStore.byCapital.term;
  }

  searchByCapital(term:string):void{
    this.isLoading = true;
   this.countryService.searchCapital(term)
   .subscribe(countries => {
    this.countries = countries;
    this.isLoading = false;
    console.log(countries)
   })
  }
}
