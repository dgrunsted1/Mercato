import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    let query = `INSERT INTO locations (name, lattd, lngtd) VALUES ('${body.name}', '${body.lattd}', '${body.lngtd}')`;
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });
        let add_activity_location_query = `INSERT INTO activity_locations (activity_id, location_id, description) VALUES ((SELECT id FROM activities WHERE type = '${body.type}'), '${results.insertId}', '${body.desc}')`;
        let activity_location = await mysqlconn.query(add_activity_location_query)
            .then(function([rows, fields, err]) {
                return (err) ? err : rows;
        });

        return {status: activity_location.status};
    
}