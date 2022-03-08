import { Component, Input, OnInit } from '@angular/core';
import { multipleSelectorModel } from './multiple-selector.model';

@Component({
  selector: 'app-multiple-selector',
  templateUrl: './multiple-selector.component.html',
  styleUrls: ['./multiple-selector.component.css']
})
export class MultipleSelectorComponent implements OnInit {

  constructor() { }

  @Input() selectedItems: multipleSelectorModel[] = [];

  @Input() nonselectedItems: multipleSelectorModel[] = [];

  ngOnInit(): void {
  }

  select(item: multipleSelectorModel, index: number) {
    this.selectedItems.push(item);
    this.nonselectedItems.splice(index, 1);
  }

  deselect(item: multipleSelectorModel, index: number) {
    this.nonselectedItems.push(item);
    this.selectedItems.splice(index, 1);
  }

  selectAll() {
    this.selectedItems.push(...this.nonselectedItems);
    this.nonselectedItems = [];
  }

  deselectAll() {
    this.nonselectedItems.push(...this.selectedItems);
    this.selectedItems = [];
  }

}
