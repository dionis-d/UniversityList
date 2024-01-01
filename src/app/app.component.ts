import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { HttpParams } from "@angular/common/http";
import { injectUniversities } from "./services/university/university.view-model";
import { toSignal } from "@angular/core/rxjs-interop";
import { map, Subject, switchMap } from "rxjs";
import { University } from "./services/university/university.model";
import { faHandPointUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, CommonModule, RouterOutlet, FaIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  protected readonly faHandPointUp = faHandPointUp;

  vm = injectUniversities()
  searchParams = new Subject<HttpParams>()

  universities: Signal<University[] | undefined> = toSignal(this.getUniversities$())
  loading = this.vm.loading;
  loadingTable = signal(false)
  countryList = toSignal(this.vm.countries);
  countryName = '';
  universityName = '';


  selectedCountryChanged(country: string) {
    this.countryName = country;
  }

  universityNameChanged(universityName: string) {
    this.universityName = universityName;
  }

  search() {
    let params = new HttpParams()

    if (this.countryName) {
      params = params.append('country', this.countryName)
    }

    if (this.universityName) {
      params = params.append('name', this.universityName)
    }
    this.loadingTable.set(true)
    this.searchParams.next(params)
  }

  reset() {
    this.countryName = '';
    this.universityName = '';
    this.search();
  }

  private getUniversities$() {
    return this.searchParams.pipe(
      switchMap((params: HttpParams) => {
        return this.vm.getUniversities$(params).pipe(map((universities: University[]) => {
          this.loadingTable.set(false)
          return universities.slice(0, 10)
        }))
      }))
  }

}
