import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  type_select = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addItem(movie_title: String, number_in_stock: String, rental_rate: String): void {
    movie_title = movie_title.trim();

    // can throw some validations in here
    this.apiService.addItem(Number(this.type_select), movie_title, Number(number_in_stock), Number(rental_rate)).subscribe((item) => console.log(item));
  }

}
