import { mysqlconnFn } from '$lib/components/db';

export async function get(){
    let mysqlconn = await mysqlconnFn();
    let result;
    let possible_answers = [];
    let results = await mysqlconn.query('SELECT word FROM words')
        .then(function([rows, fields]) {
            return rows;
        });

    for (let i = 0; i < results.length; i++){
        possible_answers.push(results[i].word);
    }
    console.log({possible_answers});
    return {
        body: { possible_answers }
    };
}



