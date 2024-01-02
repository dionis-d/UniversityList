import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { University } from "./university.model";
import { map, of } from "rxjs";
import { countries } from "./countries.local";

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private readonly URL = 'http://universities.hipolabs.com/search'
  http = inject(HttpClient)

  getUniversities(params: HttpParams = new HttpParams()) {
    return this.http.get<University[]>(this.URL, {params})
  }

  getCountryList() {
    const isLoading = signal(true);

    return {
      countries: inject(UniversityService).getUniversities().pipe(
        map((university: University[]) => {
          isLoading.set(false)
          return university.map((university: University) => university.country);
        })),
      isLoading: isLoading
    }
  }

  getLocalCountries() {
    return of(countries)
  }

  getLocalUniversities() {
   return this.http.get<University[]>('assets/universities.json');
  }
}
