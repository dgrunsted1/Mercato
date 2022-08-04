import { mysqlconnFn } from '$lib/components/db';

export const post = async(data) => {
    console.log("here");
    let mysqlconn = await mysqlconnFn();
    let events = [];
    let body = await data.request.json();
    let type = body.type;
    let user = 1;
    let query = `   SELECT 
                        e.id as id, start_date, end_date, e.descriptionas as event_description, l.name as name, l.address as address, l.coordinates as coords, al.description as location_description
                    FROM 
                        events as e 
                    JOIN 
                        activity_users as au 
                    JOIN 
                        activities as a 
                    JOIN 
                        activity_locations as al 
                    JOIN 
                        locations as l 
                    ON 
                        e.activity_id = au.activity_id 
                        AND 
                        a.id=au.activity_id 
                        AND 
                        e.activity_id = al.activity_id 
                        AND 
                        al.location_id = l.id 
                    WHERE 
                        activity_id=${type} 
                        AND 
                        user_id=${user}`;
                        console.log(
                            query
                        );
    let results = await mysqlconn.query(query)
        .then(function([rows, fields]) {
            return rows;
        });

    for (let i = 0; i < results.length; i++){
        events.push({
            id: results[i].id,
            start_date: results[i].start_date,
            end_date: results[i].end_date,
            event_description: results[i].event_description,
            name: results[i].name,
            address: results[i].address,
            coords: results[i].coords,
            location_description: results[i].location_description
        });
    }
    return {
        body: { events }
    };
}



