let mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const connMysql = () => {
    let data_db = [{
        host: `${process.env.HOST}`,
        port: `${process.env.PORTDB}`,
        user: `${process.env.USERDB}`,
        password: `${process.env.PASSWORD}`,
        database: `${process.env.DATABASE}`
    },{
        host: `${process.env.LOCAL_HOST}`,
        user: `${process.env.LOCAL_USER}`,
        port: `${process.env.LOCAL_PORTDB}`,
        password: `${process.env.LOCAL_PASSWORD}`,
        database: `${process.env.LOCAL_DATABASE}`
    }];    
    return mysql.createConnection(data_db[1]);    
};

module.exports = () => { return connMysql };