export interface Rental {
    item_rental_id: number;
    customer_id: number;
    item_id: number;
    rental_date_out: any;
    rental_date_due: any;
    rental_date_returned: any;
    rental_amount_due: number;
    rental_notes: String;
}