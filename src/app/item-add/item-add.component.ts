import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  addItem(media_code: number, movie_title: String, number_in_stock: String, rental_rate: String): void {
    movie_title = movie_title.trim();

    // can throw some validations in here
    this.apiService.addItem(media_code, movie_title, Number(number_in_stock), Number(rental_rate)).subscribe((item) => console.log(item));
  }

}
