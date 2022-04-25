import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders}from'@angular/common/http'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  private biuldHeaders(headers:HttpHeaders, tokens:string){
  
    headers.append('x-access-token', tokens);
    
  }
  userLogin(email:string, pw:string)
  {

    let url ="http://localhost:3000/login"
   // return this.http.post(url,{email:email, password:pw}).pipe(map((data: any)=>{return data}))
    return this.http.post(url,{email:email, password:pw} );
  }

  getAllRental(token:string)
  {
  
    let url ="http://localhost:3000/rentals"

    return this.http.get(url,{ headers: {'x-access-token': token} });
  }
  getRentalsByName(token:string, name:string)
  {
  
    let url ="http://localhost:3000/rentals?name="+name

    return this.http.get(url,{ headers: {'x-access-token': token} });
  }

  getAllInventory(token:string)
  {
  
    let url ="http://localhost:3000/inventory"

    return this.http.get(url,{ headers: {'x-access-token': token} });
  }

  getInventoryItem(token:string,title:string)
  {
  
    let url ="http://localhost:3000/inventory?name="+title

    return this.http.get(url,{ headers: {'x-access-token': token} });
  }
}
