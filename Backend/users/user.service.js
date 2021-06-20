const pool = require('../mysql/mysql.config');
userServices={
    getAllUsers: async ()=>{
        const user = await pool.awaitQuery('select * from users');
        return user;
    },
    getUser: async (id)=>{
        const user = await pool.awaitQuery('select * from users where id = ?',[id]);
        return user;
    },
    login: async (username, password)=>{
        const user = await pool.awaitQuery('select * from users where userName=?',[username]);
        if(user.length===0){
             return {"msg":"user not found"}
        }
        if(user[0].password===password){
            return {"id":user[0].id,"name":user[0].userName}
        }
        else{
            return {"msg":"Password incorrect"}
        }
    }
}

module.exports= userServices;