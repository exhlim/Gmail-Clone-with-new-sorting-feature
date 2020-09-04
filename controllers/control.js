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

    let registerPage=(request,response)=> {
        response.render("RegisteringPage")
    }
    let registerDone=(request,response)=> {
        let params = [
            request.body.username,
        ]
        db.poolRoutes.registerCheckFX(params, (err,results)=> {
            console.log(results.rows.length)
            // If the username already exists render the same login page
            if(results.rows.length !== 0) {
                response.redirect('/register')
            } else {
                params.push(sha256(`${request.body.password}`));
                // If the username does not exists render the email input page.
                db.poolRoutes.registerFX(params, (err,results2)=> {
                    console.log(results2)
                    response.send("Successfully registered")
                })
            }
        })
    }
// <----------------------------------------------------------------------------------------------------------> //
// <----------------------------------------------LOGIN/REGISTER----------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
    return {
        loginPage,
        loginCheck,

        registerPage,
        registerDone
    }
}