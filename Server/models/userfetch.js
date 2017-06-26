var getConnection = require('./DBconnection');

class userfetch {
    static login(email, callback){
        let conn = getConnection();
        conn.query("SELECT name,email,password,col,skin FROM users WHERE email = ?", email, callback);
    }

    static registerEmail(email, callback){
        let conn = getConnection();
        conn.query("SELECT name,email FROM users WHERE email = ?", email, callback);
    }

    static registerUser(name, callback){
        let conn = getConnection();
        conn.query("SELECT name,email FROM users WHERE name = ?", name, callback);
    }

    static registerInsert(userinfo, callback){
        let conn = getConnection();
        conn.query("INSERT into users (email,name,password) VALUES(?, ?, ?)",
            [userinfo.email, userinfo.name, userinfo.password], callback);
    }

    static customUpdate(userinfo, callback){
        let conn = getConnection();
        conn.query("UPDATE users SET col = ?, skin = ? WHERE email = ?",
            [userinfo.col, userinfo.skin, userinfo.email], callback);
    }
}
module.exports = userfetch;