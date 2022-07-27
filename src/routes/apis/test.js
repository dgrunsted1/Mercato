import { mysqlconnFn } from '$lib/components/db';



const input_data = "here hahaha bitch";

export async function get(){




    let mysqlconn = await mysqlconnFn();

    let results = await mysqlconn.query("SELECT word FROM words")
        .then(function([rows, result, fields]) {
            return rows;
        });



    return {
        body: { results }
    };  
}