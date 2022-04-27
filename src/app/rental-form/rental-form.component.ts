import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/models/Customer.model';
import { Item } from 'src/models/Item.model';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-form',
  templateUrl: './rental-form.component.html',
  styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {

  selected_item: Item | undefined;
  items: Item[] = [];
  customers: Customer[] = [];

  customer_select: any;

  constructor(
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: number,
    private dialogRef: MatDialogRef<RentalFormComponent>,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.getItems();
    this.getCustomers();
  }

  getCustomers(): void {
    this.customers = [];

    this.apiService.getCustomers().subscribe((custs) => {
      let temp_custs: any = custs['customers' as keyof Customer[]];
      temp_custs.forEach((cust: any) => {
        let new_cust: Customer = cust;
        this.customers.push(new_cust);
      });
    })
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

  getItems(): void {
    this.items = [];
    this.apiService.getItems().subscribe((items) => 
      { 
        let temp_items: any = items['inventory' as keyof Item[]];
        temp_items.forEach((item: any) => {
          let new_item: Item = item;
          this.items.push(new_item);
        });

        this.getSelectedItem(this.data);
      });
  }

  getSelectedItem(id: any) {
    this.selected_item = this.items.find(item => item.item_id === Number(id));
  }

  rent(): void {
    this.apiService.newRental(this.customer_select, this.selected_item!.item_id, '').subscribe((res) => {
      if (res['affectedRows'] > 0) {
        this.dialogRef.close();
        this.router.navigateByUrl("/inventory");
      }
    });
  }

}
