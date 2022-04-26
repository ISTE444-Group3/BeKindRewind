import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Item } from 'src/models/Item.model';
import { ApiService } from '../api.service';
import { RentalFormComponent } from '../rental-form/rental-form.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] =[];
  value = '';
  window = window;

  constructor(private apiService: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    if (window.sessionStorage.getItem("logged_in") === "true") {
      this.getItems();
    }
  }

  getItems(): void {
    this.apiService.getItems().subscribe((items) => 
      { 
        this.convertResultsToItems(items);
      });
  }

  convertResultsToItems(results: any) {
    let temp_items: any = results['inventory' as keyof Item[]];
    temp_items.forEach((item: any) => {
      let new_item: Item = item;
      this.items.push(new_item);
    });
  }

  convertMediaType(type: any): String {
    if (type === 1 || type === '1') {
      return "VHS";
    } else if (type === 2 || type === '2') {
      return "DVD";
    } else {
      return "LASERDISC";
    }
  }

  clearSearch() {
    this.value = '';

    this.items = [];
    this.getItems();
  }

  search() {
    let query = this.value.trim();

    if (query.length === 0) {
      this.items = [];
      this.getItems();
    }

    this.items = [];
    this.apiService.getItemsByName(query).subscribe((items) => this.convertResultsToItems(items));
  }

  openRentalForm(id: number) {
    this.dialog.open(RentalFormComponent, {
      data: id
    })
  }

}
