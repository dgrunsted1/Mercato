import { mysqlconnFn } from '$lib/components/db';

export async function get(){


    let first_row = ["title", "description"];
    let mysqlconn = await mysqlconnFn();
    let activity_a = [];
    let activity_b = [];
    let travel_a = [];
    let travel_b = [];
    let stay_a = [];
    let stay_b = [];
    let type = "activity";
    let query = `SELECT * FROM itinerary_inputs`;
    console.log({query});
    let results = await mysqlconn.query(query)
        .then(function([rows, result, fields]) {
            return rows;
        });

    for (let i = 0; i < results.length; i++){
        if (first_row.includes(results[i].name)){
            if (results[i].activity) activity_a.push({"name": results[i].name, "type": results[i].type});
            if (results[i].travel) travel_a.push({"name": results[i].name, "type": results[i].type});
            if  (results[i].stay) stay_a.push({"name": results[i].name, "type": results[i].type});
        } else {
            if (results[i].activity) activity_b.push({"name": results[i].name, "type": results[i].type});
            if (results[i].travel) travel_b.push({"name": results[i].name, "type": results[i].type});
            if  (results[i].stay) stay_b.push({"name": results[i].name, "type": results[i].type});
        }
    }
    let input_data ={"activity" : [activity_a, activity_b], "travel" : [travel_a, travel_b], "stay" : [stay_a, stay_b]};
    console.log({input_data});
    return {
        body: { input_data }
    };
}