module.exports = (poolParameter) => {

    let loginCheckFX=(params, callback)=> {
        let loginQuery = `SELECT * FROM userdb WHERE username=$1 AND password=$2`
        poolParameter.query(loginQuery,params, (err,result)=> {
            callback(err,result)
        })

    }
    let registerCheckFX=(params,callback)=> {
        // if username is already there, return 1 object
        // if username is not there then it will return empty row
        let registerCheckQuery = `SELECT * FROM userdb WHERE username=$1`
        poolParameter.query(registerCheckQuery,params, (err,result)=> {
            callback(err,result)
        })
    }
    let registerFX=(params, callback)=> {
        let registerQuery = `INSERT INTO userdb (username,password) VALUES ($1,$2) RETURNING *`
        poolParameter.query(registerQuery,params, (err,result)=> {
            callback(err,result)
        })
    }
    let homeFX=(params, callback)=> {
        callback(null, null)
    }

    let insertKeywordFX = (params, callback)=> {
        let query = `UPDATE userdb SET keywords `
    }

    return {
        loginCheckFX,
        registerCheckFX,
        registerFX,
        homeFX
    }
}