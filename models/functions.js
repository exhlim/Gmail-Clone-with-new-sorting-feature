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

    // let insertNewSongFX =(params, callback)=>{
    //     let insertQuery = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES ($1,$2,$3,$4,$5)'
    //     poolParameter.query(insertQuery,params, (err, result)=> {
    //         callback(err, result);
    //     })
    // }

    return {
        loginCheckFX,
        registerCheckFX,
        registerFX
    }
}