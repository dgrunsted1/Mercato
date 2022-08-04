import { mysqlconnFn } from '$lib/components/db';

export async function get(){
    let mysqlconn = await mysqlconnFn();
    let results = await mysqlconn.query('INSERT INTO ')
        .then(function([err, rows, fields, result]) {
            return (result.ok) ? true: err;
        });
    return {
        body: { results }
    };
}

