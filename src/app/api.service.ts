import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, tap } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Rental } from 'src/models/Rental.model';
import { Customer } from 'src/models/Customer.model';
import { Item } from 'src/models/Item.model';
import { User } from 'src/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) {
    window.sessionStorage.setItem('logged_in', 'false');
   }

  // api paths
  private base_url = 'http://ec2-3-227-66-148.compute-1.amazonaws.com:3000';
  // private base_url = 'http://localhost:3000';
  private rentals = `${this.base_url}/rentals`;
  private inventory = `${this.base_url}/inventory`;
  private customer = `${this.base_url}/customers`;
  private login = `${this.base_url}/login`;
  private register = `${this.base_url}/register`;

  // token header
  private token: any = '';

  // functions
  setToken(token: String): void {
    this.token = token;
  }

  // inventory
  getItems(): Observable<Item[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Item[]>(this.inventory, httpOptions);
  }

  getItemsByName(name: String): Observable<Item[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Item[]>(`${this.inventory}?name=${name}`, httpOptions)
  }

  addItem(media_code: number, movie_title: String, number_in_stock: number, rental_rate: number): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.post<Item>(`${this.inventory}?media_code=${media_code}&movie_title=${movie_title}&number_in_stock=${number_in_stock}&rental_rate=${rental_rate}`, null, httpOptions);
  }

  updateItem(id: number, media_code?: number, title?: String, num_in_stock?: number, rate?: number): Observable<any> {
    let url = `${this.inventory}?item_id=${id}`;

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

    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.put(url, null, httpOptions);
  }

  deleteItem(id?: number, name?: String): Observable<any> {
    let url = `${this.inventory}`;

    if (id) {
      url += `?item_id=${id}`;
    }
    if (name) {
      url += `?name=${name}`;
    }

    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };
    
    return this.http.delete<Item>(url, httpOptions);
  }

  // rentals
  getRentals(): Observable<Rental[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Rental[]>(this.rentals, httpOptions);
  }

  getRentalsForCustomer(name: String): Observable<Rental[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Rental[]>(`${this.rentals}?name=${name}`, httpOptions);
  }

  newRental(customer: number, item: number, notes: String): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.post<Rental>(`${this.rentals}?customer_id=${customer}&item_id=${item}&notes=${notes}`, null, httpOptions);
  }

  // customers
  getCustomers(): Observable<Customer[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Customer[]>(this.customer, httpOptions);
  }

  getCustomersByName(name: String): Observable<Customer[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.get<Customer[]>(`${this.customer}?name=${name}`, httpOptions)
  }

  // login/register - both are POST
  loginUser(email: String, password: String): any {
    let info = {
      "email": email,
      "password": password
    };

    let httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': this.token })
    };

    return this.http.post<User>(`${this.login}`, info, httpOptions).pipe(tap(user => {
      this.token = user.session_token;
    }));
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

  logoutUser(): void {
    this.token = '';
    window.sessionStorage.setItem("logged_in", "false");
  }

}
