import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule ,FormGroup,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  enteredSearchValue: string = '';

@Output()
searchTextChanged:EventEmitter<string> = new EventEmitter<string>()
onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchValue)
}

}
