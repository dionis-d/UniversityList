import { inject } from "@angular/core";
import { UniversityService } from "./university.service";
import { HttpParams } from "@angular/common/http";
import { catchError, map, of } from "rxjs";
import { countries } from "./countries.local";


export function injectUniversities() {
  const service = inject(UniversityService)
  const list = service.getCountryList()
  return {
    getUniversities$: (params?: HttpParams) => service.getUniversities(params),
    countries: list.countries.pipe(map((countries: string[]) => {
      return Array.from(new Set(countries)).sort();
    }), catchError((error) => {
      console.log('Getting countries from local file...')
      list.isLoading.set(false);
      return service.getLocalCountries();
    })),
    loading: list.isLoading,
  }
}
