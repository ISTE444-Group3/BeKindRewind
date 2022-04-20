# BeKindRewind

## Path Function Definitions:

__Rentals__
* GET /rentals: Returns all current checked out rental videos
* GET /rentals?name=[NAME]: Returns all current checked out rental videos for named customer

__Inventory__
* GET /inventory: Returns all videos currently stored in inventory
* GET /inventory?name=[NAME]: Returns all videos currently stored in inventory with like name
* POST /inventory?media_code=[1: VHS | 2: DVD | 3: LASERDISC]&movie_title=[TITLE]&number_in_stock=[NUM]&rental_rate=[RA.TE]: Inserts a new inventory record with passed data
* PUT /inventory?itemId=[ID]&media_code=[1: VHS | 2: DVD | 3: LASERDISC] | &movie_title=[TITLE] | &number_in_stock=[NUM] | &rental_rate=[RA.TE]: Updates item at itemId with any given values (Can do one or multiple, but at least one)
* DELETE /inventory?itemId=[ID] | ?name=[NAME]: Deletes record with either ID or NAME from database (ID Recommended to help accidental deletes)
