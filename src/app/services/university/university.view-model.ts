import { inject } from "@angular/core";
import { UniversityService } from "./university.service";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs";


export function injectUniversities() {
  const service = inject(UniversityService)
  const list = service.getCountryList()
  return {
    getUniversities$: (params?: HttpParams) => service.getUniversities(params),
    countries: list.countries.pipe(map((countries: string[]) => {
      return Array.from(new Set(countries)).sort()
    })),
    loading: list.isLoading,
  }
}
