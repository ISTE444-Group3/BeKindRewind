import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {

  type_select = '';
  window = window;

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
  }

  addItem(movie_title: String, number_in_stock: String, rental_rate: String): void {
    movie_title = movie_title.trim();

    // can throw some validations in here
    this.apiService.addItem(Number(this.type_select), movie_title, Number(number_in_stock), Number(rental_rate)).subscribe((item) => {
      if (item['insertId'] > 0) {
        this.router.navigateByUrl('/inventory');
      }
    });
  }

}
