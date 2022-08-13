import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    let query = `INSERT INTO events (start_date, end_date, description, activity_id, location_id) VALUES ('${body.start}', '${body.end}', '${body.description}', ${body.act}, ${body.loc})`;
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

    let add_user_query = `INSERT INTO event_users (event_id, user_id) VALUES (${results.insertId}, ${body.user})`;
    let add_user_results = await mysqlconn.query(add_user_query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

}