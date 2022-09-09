import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    let query = `UPDATE activity_locations SET is_checked=0 WHERE id=${body.act_loc_id}`;
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

    return {status: results.status};
    
}