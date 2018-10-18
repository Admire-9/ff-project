import mysqlconf from '../config/mysqlconf';
import mysql from 'mysql';
import { isEmptyObject, sqlParamsAdd, updateParamsAdd, insertParamsAdd } from '../../tool'

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
                        console.log(err, "err");
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
    findArticle: args => {
        let _sql = "";
        if(args === undefined || isEmptyObject(args)){
            _sql = `select * from article`;
        }else{
            _sql = `select * from article where ${sqlParamsAdd(args)}`;
        }
        return query(_sql);
    },
    updateArticle: (id, articleInput, type) => {
        let _sql = "";
        let {title, time, mkcontent, tag, sort, overview} = articleInput;
        let params = {title, time, mkcontent, tag, sort, overview};
        if(type === "update") {
            _sql = `update article set ${updateParamsAdd(articleInput)} where id=${id}`;
        }else {
            _sql = `insert into article values('${id}', ${insertParamsAdd(params)})`;
        }
        console.log(_sql, "_sql");
        return query(_sql);
    },
    delArticle: (id) => {
        let _sql = "";
        _sql = `DELETE FROM article WHERE id='${id}'`;
        console.log(_sql, "_sql");
        return query(_sql);
    }
}

export default sqlBehavior;