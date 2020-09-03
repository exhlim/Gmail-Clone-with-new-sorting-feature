const sha256=require('js-sha256');
let SALT = "exhlim";
let PEPPER = "";
module.exports = (db) => {
// <----------------------------------------------------------------------------------------------------------> //
// <----------------------------------------------LOGIN/REGISTER----------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
    let loginPage=(request,response)=> {
        if(!request.cookies['loggedIn']) {
            response.render('LoginPage')
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