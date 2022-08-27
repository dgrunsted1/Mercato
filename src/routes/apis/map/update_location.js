import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    console.log({body});
    let query = `UPDATE locations SET name='${body.name}' WHERE id=${body.id}`;
    console.log({query});
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

    let al_query = `UPDATE activity_locations SET description='${body.desc}' WHERE id=${body.act_loc_id}`;
    console.log({al_query});
    let al_results = await mysqlconn.query(al_query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });

    return {status: al_results.status};
    
}