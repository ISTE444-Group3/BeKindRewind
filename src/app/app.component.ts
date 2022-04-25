import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { Loggins } from './loggins';
import {Rental} from './rental';
import {Inventory} from './inventory'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BeKindRewind';
 
  loggedin:any;
  rentals:any;
  rentalByName:any;
  inventory:any;
  inventoryItem:any;
  
  session_token='';

  
  constructor(private login:ApiService,)
  {

     this.login.userLogin('daven@email.com','Admin123').subscribe(data=>{
   
      
      this.loggedin=<Loggins>data;
      
     
      console.warn(this.loggedin.session_token);
     this.getAllRentals(login);
     this.getRentalsByName(login)
     this.getAllInventory(login);
     this.getInventoryItem(login);
     
    });

 
    
  }

  getAllRentals(login:ApiService){

    
  this.login.getAllRental(this.loggedin.session_token)
      .subscribe(data=>{
         
          this.rentals=data;
          console.warn(this.rentals);
          
      });
  }
  getRentalsByName(login:ApiService){

    
    this.login.getRentalsByName(this.loggedin.session_token, 'Spence')
        .subscribe(data=>{
           
            this.rentalByName=data;
            console.warn(this.rentalByName.rentals[0].rental_date_due);
            
        });
    }
  getAllInventory(login:ApiService){

    this.login.getAllInventory(this.loggedin.session_token)
      .subscribe(data=>{
         
          this.inventory=data;
          console.warn(this.inventory.inventory[2]);
          
      });
  }

  getInventoryItem(login:ApiService){

    this.login.getInventoryItem(this.loggedin.session_token, 'Omen')
      .subscribe(data=>{
         
          this.inventoryItem=data;
          console.warn(this.inventoryItem.inventory[0].rental_rate);
          
      });
  }
}
