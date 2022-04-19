const db = require('./db');

async function getMultiple(){
    // const rows = await db.conn.query(
    //     `SELECT CONCAT(c.last_name,", ",c.first_name) as customer_name, ii.movie_title, imt.item_media_description, cir.rental_date_out, cir.rental_date_due, cir.rental_date_returned
    //     FROM bekindrewind.customer_item_rental cir
    //     JOIN bekindrewind.customer c on cir.customer_id=c.customer_id
    //     join bekindrewind.inventory_items ii on cir.item_id=ii.item_id
    //     join bekindrewind.inventory_media_types imt on ii.media_code = imt.item_media_code`
    // );

    var sql = `SELECT CONCAT(c.last_name,", ",c.first_name) as customer_name, ii.movie_title, imt.item_media_description, cir.rental_date_out, cir.rental_date_due, cir.rental_date_returned
        FROM bekindrewind.customer_item_rental cir
        JOIN bekindrewind.customer c on cir.customer_id=c.customer_id
        join bekindrewind.inventory_items ii on cir.item_id=ii.item_id
        join bekindrewind.inventory_media_types imt on ii.media_code = imt.item_media_code`;

    return db.con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        return result;
    });
}

module.exports = {
    getMultiple
}