module.exports = (poolParameter) => {

    let loginCheckFX=(params, callback)=> {
        let loginQuery = `SELECT * FROM userdb WHERE username=$1 AND password=$2`
        poolParameter.query(loginQuery,params, (err,result)=> {
            callback(err,result)
        })

    }
    let registerFX=(callback)=> {
        callback(null,null)
    }
    // let insertNewSongFX =(params, callback)=>{
    //     let insertQuery = 'INSERT INTO songs (title,album,preview_link,artwork,artist_id) VALUES ($1,$2,$3,$4,$5)'
    //     poolParameter.query(insertQuery,params, (err, result)=> {
    //         callback(err, result);
    //     })
    // }

    return {
        loginCheckFX,
        registerFX
    }
}