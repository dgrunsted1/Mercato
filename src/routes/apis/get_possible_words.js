import { mysqlconnFn } from '$lib/components/db';

export async function get(){
    let mysqlconn = await mysqlconnFn();

    let possible_answers = await mysqlconn.query('SELECT * FROM words')
        .then(function([rows,fields]) {
            return rows;
        });
        
    return {
        body: { possible_answers }
    };
}



