import { mysqlconnFn } from '$lib/components/db';
import { ExitStatus } from 'typescript';

export const post = async(data) => {
    let mysqlconn = await mysqlconnFn();
    let events = [];
    let body = await data.request.json();
    let type = body.type;
    let user = body.user;
    let type_where;
    $: type_where = (type != "home") ? `type = '${type}' AND` :  "";
    let query = `   SELECT 
                        e.id as id, start_date, end_date, e.description as event_description, l.name as name, l.address as address, l.coordinates as coords, al.description as location_description
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
                        ${type_where} 
                        user_id=${user}`;
    let results = await mysqlconn.query(query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
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

    let this_week = [[],[],[],[],[],[],[]];
        let todays_date = new Date();
        for (let i = 0; i < 7; i++) {
            let temp_date_begin = new Date(todays_date.getFullYear(), todays_date.getMonth(), todays_date.getDate()+i);
            let temp_date_end = new Date(todays_date.getFullYear(), todays_date.getMonth(), todays_date.getDate()+i+1);
            let found = false;
            for (let j = 0; j < events.length; j++) {
                if (events[j].start_date >= temp_date_begin && events[j].start_date < temp_date_end || 
                    events[j].end_date >= temp_date_begin && events[j].end_date < temp_date_end) {
                    this_week[i].push(events[j]);
                    found = true;
                }
            }
            if (!found) this_week[i].push();
        }
    
        let tabs = [];
        let tab_query = `SELECT a.type as type, a.id as id FROM activity_users as au JOIN activities as a on au.activity_id = a.id WHERE au.user_id=${user}`;
        let tab_results = await mysqlconn.query(tab_query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
        });

        for (let i = 0; i < tab_results.length; i++){
            tabs.push({type: tab_results[i].type, id: tab_results[i].id});
        }
        let locations = [];
        let and_activity = (type != 'home') ? ` AND a.type = '${type}'` :``;
        let loc_query = `SELECT l.name as name, l.id as id FROM locations AS l JOIN activity_locations AS al ON l.id = al.location_id JOIN activity_users AS au ON au.activity_id=al.activity_id JOIN activities AS a ON a.id=al.activity_id WHERE au.user_id=${user}`;

        let loc_results = await mysqlconn.query(loc_query)
        .then(function([rows, fields, err]) {
            return (err) ? err : rows;
        });

        for (let i = 0; i < loc_results.length; i++){
            locations.push({name: loc_results[i].name,id: loc_results[i].id});
        }
    return {
        body: { this_week: this_week 
                , tabs: tabs,
                locations: locations }
    };
}



