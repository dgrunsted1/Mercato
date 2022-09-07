import { mysqlconnFn } from '$lib/components/db';


export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let body = await data.request.json();
    let query = `DELETE FROM locations WHERE id=${body.id}`;
    console.log(query);
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
    });
        let add_activity_location_query = `DELETE FROM activity_locations WHERE id=${body.act_loc_id}`;
        console.log(add_activity_location_query);
        let activity_location = await mysqlconn.query(add_activity_location_query)
            .then(function([rows, fields, err]) {
                return (err) ? err : rows;
        });

        return {status: activity_location.status};
    
}