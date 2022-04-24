# BeKindRewind

## Path Function Definitions:

__Authentication__
* POST /register: Registers the User data sent inside the JSON Body and returns the associated user_id and session_token (Valid for 24 Hours), formatted as follows:
    ```
    Input Parameters:
    {
        "first_name": "Name",
        "last_name": "Name",
        "email": "Email",
        "password": "Password"
    }
    ```
    ```
    Output Parameters:
    {
        "userID": XX,
        "userToken": "TokenValue"
    }
    ```
* POST /login: Returns the session_token (Valid for 24 Hours) of the logged in user, with credentials passed through JSON Body, formatted as follows:
    ```
    Input Parameters:
    {
        "email": "Email",
        "password": "Password"
    }
    ```
    ```
    Output Parameters:
    {
        "user_id": XX,
        "user_name": "User Name",
        "email": "Email",
        "session_token": "TokenValue"
    }
    ```

___

## ALL BELOW ENDPOINTS REQUIRE YOUR USER TOKEN PASSED AS ONE OF THE FOLLOWING: 
* Request Headers: `"x-access-token": tokenValue`
* Request Body: `"token": "tokenValue"`
* Query Parameter (NOT RECOMMENDED): `&token=tokenValue`
### Tokens MUST Be Re-Created (Log-In) 24 Hours After Creation!

___

__Rentals__
* GET /rentals: Returns all current checked out rental videos
* GET /rentals?name=[NAME]: Returns all current checked out rental videos for named customer
* POST /rentals?customer_id=[ID]&item_id=[ID]&notes=[Notes]

__Inventory__
* GET /inventory: Returns all videos currently stored in inventory
* GET /inventory?name=[NAME]: Returns all videos currently stored in inventory with like name
* POST /inventory?media_code=[1: VHS | 2: DVD | 3: LASERDISC]&movie_title=[TITLE]&number_in_stock=[NUM]&rental_rate=[RA.TE]: Inserts a new inventory record with passed data
* PUT /inventory?itemId=[ID]&media_code=[1: VHS | 2: DVD | 3: LASERDISC] | &movie_title=[TITLE] | &number_in_stock=[NUM] | &rental_rate=[RA.TE]: Updates item at itemId with any given values (Can do one or multiple, but at least one)
* DELETE /inventory?itemId=[ID] | ?name=[NAME]: Deletes record with either ID or NAME from database (ID Recommended to help accidental deletes)

__Customers__
* GET /customer: Get all customers
* GET /customer?name=[NAME]: Get all customers with name matching [NAME]
