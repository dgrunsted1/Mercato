import mysql from 'mysql2/promise';

let mysqlconn = null;

export function mysqlconnFn() {

    if (!mysqlconn) {
        mysqlconn = mysql.createConnection({ 
            host: '185.2.168.124',
            user: 'mergecon_Dave',
            password: '[!zSn?.y+fMe',
            database: 'mergecon_first'
        });
    }

    return mysqlconn;
}