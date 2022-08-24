import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    let query = `UPDATE events SET activity_id=${body.act}, location_id=${body.loc},description='${body.description}', start_date='${body.start}', end_date='${body.end}' WHERE id=${body.id}`;
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });
}