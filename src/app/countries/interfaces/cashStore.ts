import { Country } from "./country"
import { Region } from "./Region"

export interface CashStore {
  byCapital:TermCountries
  byCountry:TermCountries
  byRegion:RegionCountries
}
export interface TermCountries{
    term:string
    countries:Country[]
}
export interface RegionCountries{
  region?:Region
  countries:Country[]
}
