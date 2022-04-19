const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
    const offset = helper.getOffset(page, config.listPerPage);
    const rows = await db.query(
        `SELECT CONCAT(c.last_name,", ",c.first_name) as customer_name, ii.movie_title, imt.item_media_description, cir.rental_date_out, cir.rental_date_due, cir.rental_date_returned
        FROM bekindrewind.customer_item_rental cir
        JOIN bekindrewind.customer c on cir.customer_id=c.customer_id
        join bekindrewind.inventory_items ii on cir.item_id=ii.item_id
        join bekindrewind.inventory_media_types imt on ii.media_code = imt.item_media_code LIMIT ${offset},${config.listPerPage}`
    );
    const data = helper.emptyOrRows(rows);
    const meta = {page};

    return {
        data,
        meta
    }
}

module.exports = {
    getMultiple
}