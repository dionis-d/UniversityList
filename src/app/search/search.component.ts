import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from "@ng-bootstrap/ng-bootstrap";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgbDropdown,
    NgbDropdownMenu,
    NgbDropdownToggle,
    NgbDropdownItem,
    FaIconComponent,
    FormsModule,
    NgClass
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  @Input({required: true}) countryList!: string[];
  @Input() loading = true;
  @Input() selectedCountry = '';
  @Output() selectedCountryChanged = new EventEmitter<string>()

  @Input() universityName: string = '';
  @Output() universityNameChanged = new EventEmitter<string>()
  @Output() searchButtonClick = new EventEmitter<void>()
  @Output() resetButtonClick = new EventEmitter<void>()
  isDropdownOpened = false;
  protected readonly faXmark = faXmark;

  selectCountry(country: string) {
    this.selectedCountry = country;
    this.selectedCountryChanged.emit(country);
  }

  changeUniversityName(universityName: string) {
    this.universityName = universityName;
    this.universityNameChanged.emit(universityName);
  }

  search() {
    this.searchButtonClick.emit()
  }

  reset() {
    this.resetButtonClick.emit()
  }

  dropdownOpenedChange(opened: boolean) {
    this.isDropdownOpened = opened
  }
}
