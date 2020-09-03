const sha256=require('js-sha256');
const cookieParser = require('cookie-parser');
let SALT = "exhlim";
let reference = "";
module.exports = (db) => {
// <----------------------------------------------------------------------------------------------------------> //
// <----------------------------------------------LOGIN/REGISTER----------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
    let loginPage=(request,response)=> {
        if(!request.cookies['loggedIn']) {
            response.render('LoginPage')
        } else {
            let reference = request.cookies['reference']
            let cookieValue = request.cookies['loggedIn']
            if(cookieValue === sha256(`true${SALT}-${reference}`)) {
                response.send("You are still logged in");
            } else {
                response.send("You are tempering");
            }
        }
    }
    let loginCheck=(request,response)=> {
        let params = [
        request.body.username,
        sha256(`${request.body.password}`)
        ]
        db.poolRoutes.loginCheckFX(params, (err,results)=> {
            if(results.rows.length == 0) {
                response.redirect("/");
            } else {
                response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.rows[0].id).toString())}`))
                response.cookie("reference", (`${sha256((results.rows[0].id).toString())}`))
                response.send("Success")
            }
        })
    }

    let register=(request,response)=> {
        response.render("RegisteringPage")
    }
// <----------------------------------------------------------------------------------------------------------> //
// <----------------------------------------------LOGIN/REGISTER----------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
    return {
        loginPage,
        loginCheck,
        register
    }
}