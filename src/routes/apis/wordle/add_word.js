import { mysqlconnFn } from '$lib/components/db';

export const post = async(data) => {
    let mysqlconn = await mysqlconnFn()
    let body = await data.request.json();
    let results = await mysqlconn.query(`INSERT INTO words (word) VALUES ('${body.word}')`)
        .then(function([err, rows, result, fields]) {
            console.log(rows);
            return (err) ? err : true;
        });
    return {
        status: results.status,
        body: results
    };
}

