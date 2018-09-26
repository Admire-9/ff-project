import mysqlconf from '../config/mysqlconf';
import mysql from 'mysql';

const pool = mysql.createPool({
    host: mysqlconf.HOST,
    user: mysqlconf.USERNAME,
    password: mysqlconf.PASSWORD,
    database: mysqlconf.DATABASE,
    port: mysqlconf.PORT
});

let query = ( sql, values ) => {
    return new Promise(( resolve, reject ) => {
        pool.getConnection( (err, connection) => {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                });
            }
        });
    });
};

let createTable = ( sql ) => {
    return query( sql, [] );
}

let article = 
    `CREATE TABLE ffproject.Untitled  (
        id varchar(255) NOT NULL COMMENT '文章ID',
        title varchar(255) NOT NULL COMMENT '标题',
        time varchar(255) NOT NULL COMMENT '时间戳',
        mkcontent varchar(4000) NOT NULL COMMENT 'markdown内容',
        PRIMARY KEY (id)
      );`;

const sqlBehavior = {
    findArticle: id => {
        let _sql = `select * frome article where id=${id}`;
        return query(_sql);
    }
}

export default sqlBehavior;