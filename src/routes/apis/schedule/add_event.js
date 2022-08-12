import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    console.log(body);
    let query = `INSERT INTO events (start_date, end_date, description, activity_id, location_id) VALUES ('${body.start}', '${body.end}', '${body.description}', ${body.act}, ${body.loc})`;
    console.log(query);
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

// get resulting id for new event and 
//add the creating user as as event_user for that event

   
}