import { mysqlconnFn } from '$lib/components/db';



const input_data = "here hahaha bitch";

export async function get(){




    let mysqlconn = await mysqlconnFn();

    let results = await mysqlconn.query('SELECT * FROM photos')
        .then(function([rows,fields]) {
            return rows;
        });





    return {
        body: { results }
    };  
}