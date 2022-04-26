import { Component, OnInit } from '@angular/core';

import { Rental } from 'src/models/Rental.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-rentals-list',
  templateUrl: './rentals-list.component.html',
  styleUrls: ['./rentals-list.component.css']
})
export class RentalsListComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  rentals: Rental[] = [];
  window = window;

  columns = [
    {
      columnDef: 'customer_name',
      header: 'Customer',
      cell: (rental: Rental) => `${rental.customer_name}`,
    },
    {
      columnDef: 'item_media_description',
      header: 'Media Type',
      cell: (rental: Rental) => `${rental.item_media_description}`,
    },
    {
      columnDef: 'movie_title',
      header: 'Movie Title',
      cell: (rental: Rental) => `${rental.movie_title}`,
    },
    {
      columnDef: 'rental_date_out',
      header: 'Date Out',
      cell: (rental: Rental) => `${this.convertToDate(rental.rental_date_out)}`,
    },
    {
      columnDef: 'rental_date_due',
      header: 'Date Due',
      cell: (rental: Rental) => `${this.convertToDate(rental.rental_date_due)}`,
    },
    {
      columnDef: 'rental_date_returned',
      header: 'Date Returned',
      cell: (rental: Rental) => `${this.convertToDate(rental.rental_date_returned)}`,
    }
  ];
  dataSource = this.rentals;
  displayedColumns = this.columns.map(c => c.columnDef);

  ngOnInit(): void {
    if (window.sessionStorage.getItem("logged_in") === "true") {
      this.getRentals();
    }
  }

  getRentals(): void {
    this.rentals = [];
    this.apiService.getRentals().subscribe((rents) => {
      let temp_rentals: any = rents['rentals' as keyof Rental[]];
      temp_rentals.forEach((rental: any) => {
        let new_rental: Rental = rental;
        this.rentals.push(new_rental);
      });

      this.dataSource = this.rentals;
    });
  }

  convertToDate(input: String): any {
    if (input === null) {
      return "N/A"
    }

    let date_input: string = input.toString();
    let date = new Date(date_input);
    return date.toLocaleString();

  }

}
