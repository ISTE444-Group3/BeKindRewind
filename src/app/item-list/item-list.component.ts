import { Component, OnInit } from '@angular/core';

import { Item } from 'src/models/Item.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  items: Item[] =[];
  value = 'Search Items';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.apiService.getItems().subscribe((items) => this.items = items);
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

}