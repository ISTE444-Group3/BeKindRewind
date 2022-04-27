import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Item } from 'src/models/Item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {

  type_select: any;

  selected_item: Item | undefined;
  items: Item[] = [];

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.items = [];
    this.apiService.getItems().subscribe((items) => 
      { 
        let temp_items: any = items['inventory' as keyof Item[]];
        temp_items.forEach((item: any) => {
          let new_item: Item = item;
          this.items.push(new_item);
        });

        this.getSelectedItem(this.route.snapshot.params['id']);
      });
  }

  getSelectedItem(id: any) {
    this.selected_item = this.items.find(item => item.item_id === Number(id));
    this.type_select = this.selected_item?.media_code;
  }

  saveItem(movie_title: String, number_in_stock: String, rental_rate: String): void {
    movie_title = movie_title.trim();

    // can throw some validations in here
    this.apiService.updateItem(this.selected_item!.item_id, Number(this.type_select), movie_title, Number(number_in_stock), Number(rental_rate)).subscribe((item) => {
      if (item['rowsUpdated'] > 0) {
        this.router.navigateByUrl('/inventory');
      }
    });
  }

  deleteItem() {
    this.apiService.deleteItem(this.selected_item!.item_id).subscribe((res) => {
      if (res['rowsDeleted'] > 0) {
        this.router.navigateByUrl('/inventory');
      }
    });
  }

}
