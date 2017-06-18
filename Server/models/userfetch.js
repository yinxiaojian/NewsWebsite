var getConnection = require('./DBconnection');

class userfetch {
    static login(email, callback){
        let conn = getConnection();
        conn.query("SELECT name,email,password FROM users WHERE email = ?", email, callback);
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
        conn.query("INSERT into users VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userinfo.email, userinfo.name, userinfo.password, userinfo.society,
                userinfo.entertainment, userinfo.tech, userinfo.sports, userinfo.car,
                userinfo.finance, userinfo.funny], callback);
    }
}
module.exports = userfetch;