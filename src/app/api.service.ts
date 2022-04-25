import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Rental } from 'src/models/Rental.model';
import { Customer } from 'src/models/Customer.model';
import { Item } from 'src/models/Item.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  // api paths
  private base_url = 'http://ec2-3-227-66-148.compute-1.amazonaws.com:3000';
  private rentals = `${this.base_url}/rentals`;
  private inventory = `${this.base_url}/inventory`;
  private customer = `${this.base_url}/customer`;
  private login = `${this.base_url}/login`;
  private register = `${this.base_url}/register`;

  // token header
  private token: any = '';
  private httpOptions = {
    headers: new HttpHeaders({ 'x-access-token': this.token })
  };

  // functions
  setToken(token: String): void {
    this.token = token;
  }

  // inventory
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.inventory, this.httpOptions);
  }

  getItemsByName(name: String): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.inventory}?name=${name}`, this.httpOptions)
  }

  addItem(media_code: number, movie_title: String, number_in_stock: number, rental_rate: number): Observable<Item> {
    return this.http.post<Item>(`${this.inventory}?media_code=${media_code}&movie_title=${movie_title}&number_in_stock=${number_in_stock}&rental_rate=${rental_rate}`, null, this.httpOptions);
  }

  updateItem(id: number, media_code?: number, title?: String, num_in_stock?: number, rate?: number): Observable<any> {
    let url = `${this.inventory}?itemId=${id}`;

    if (media_code) {
      url += `&media_code=${media_code}`;
    }
    if (title) {
      url += `&movie_title=${title}`;
    }
    if (num_in_stock) {
      url += `&number_in_stock=${num_in_stock}`;
    }
    if (rate) {
      url += `&rental_rate=${rate}`;
    }

    return this.http.put(url, null, this.httpOptions);
  }

  deleteItem(id?: number, name?: String): Observable<Item> {
    let url = `${this.inventory}`;

    if (id) {
      url += `?itemId=${id}`;
    }
    if (name) {
      url += `?name=${name}`;
    }

    return this.http.delete<Item>(url, this.httpOptions);
  }

  // rentals
  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.rentals, this.httpOptions);
  }

  getRentalsForCustomer(name: String): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.rentals}?name=${name}`, this.httpOptions);
  }

  newRental(customer: number, item: number, notes: String): Observable<Rental> {
    return this.http.post<Rental>(`${this.rentals}?customer_id${customer}&item_id=${item}&notes=${notes}`, null, this.httpOptions);
  }

  // customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.customer, this.httpOptions);
  }

  getCustomersByName(name: String): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.customer}?name=${name}`, this.httpOptions)
  }

  // login/register - both are POST
  loginUser(email: String, password: String): any {
    let info = {
      "email": email,
      "password": password
    };

    return this.http.post<Object>(`${this.login}`, info, this.httpOptions);
  }

  registerUser(first: String, last: String, email: String, password: String): Observable<Object> {
    let info = {
      first_name: first,
      last_name: last,
      email: email,
      password: password
    };

    return this.http.post<Object>(`${this.register}`, info);
  }

}
