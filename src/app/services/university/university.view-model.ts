import { inject } from "@angular/core";
import { UniversityService } from "./university.service";
import { HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs";
import { University } from "./university.model";

export function injectUniversities() {
  const service = inject(UniversityService)
  const list = service.getCountryList()
  return {
    getUniversities$: (params?: HttpParams) => service.getUniversities(params).pipe(catchError((error) => {
      let country = '', name = '';
      if (params) {
        if (params.has('country')) {
          country = params.get('country') ?? '';
        }
        if (params.has('name')) {
          name = params.get('name') ?? '';
        }
      }

      return service.getLocalUniversities().pipe(map((universities: University[]) => {
        console.log('Loading from local file ...')
        const list = universities.filter((university: University) => {
          return university.country.toUpperCase() === country.toUpperCase() && university.name.toUpperCase().includes(name.toUpperCase())
        });

        return list;
      }))
    })),
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
