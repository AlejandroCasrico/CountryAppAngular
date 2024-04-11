import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CashStore } from '../interfaces/cashStore';
import { Region } from '../interfaces/Region';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private ApiUrl:string = 'https://restcountries.com/v3.1';
  constructor(private _http: HttpClient) {
    this.loadFromLocalStorage()
  }
  public cashStore:CashStore = {
    byCapital:{term:'',countries:[]},
    byRegion:{region:'',countries:[]},
    byCountry:{term:'',countries:[]}
  }

  private getCountriesRequest(url:string):Observable<Country[]>{
    return this._http.get<Country[]>(url)
    .pipe(
      catchError(()=>of([]))
     );
  }
private saveToLocalStorage(){
  localStorage.setItem('cashStore',JSON.stringify(this.cashStore))
}
private loadFromLocalStorage(){
  if(!localStorage.getItem('cashStore'))return
  this.cashStore = JSON.parse(localStorage.getItem('cashStore')!)
}
  searchCountryByAlphaCode(code:string):Observable<Country | null>{
    return this._http.get<Country[]>(`${this.ApiUrl}/alpha/${code}`)
    .pipe(
      map(countries => countries.length >0 ? countries[0] : null),
     catchError(()=>of(null)),

    );
  }

  searchCapital(term:string):Observable<Country[]>{
    const url = `${this.ApiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cashStore.byCapital = { term, countries}),
        tap(()=>this.saveToLocalStorage())
      )
  }
  searchCountry(term:string):Observable<Country[]>{
    const url =`${this.ApiUrl}/name/${term}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=> this.cashStore.byCountry ={term,countries}),
      tap(()=>this.saveToLocalStorage())

    )

  }
  searchRegion(region:Region):Observable<Country[]>{
    const url = `${this.ApiUrl}/region/${region}`
    return this.getCountriesRequest(url)
    .pipe(
      tap(countries=> this.cashStore.byRegion = {region,countries}),
      tap(()=>this.saveToLocalStorage())
    )
  }
}
