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
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
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
            // If username and password does not match with the database
            if(results.rows.length == 0) {
                response.redirect("/");
            } else {
                response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.rows[0].id).toString())}`))
                response.cookie("reference", (`${sha256((results.rows[0].id).toString())}`))
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
                response.redirect('/emailinput')
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
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results2.rows[0].id).toString())}`))
                    response.cookie("reference", (`${sha256((results2.rows[0].id).toString())}`))
                    response.redirect('/emailinput')
                })
            }
        })
    }
// <----------------------------------------------------------------------------------------------------------> //
// <-********************************************************************************************************-> //
// <----------------------------------------------------------------------------------------------------------> //

// <----------------------------------------------------------------------------------------------------------> //
// <------------------------------------------Email Input/ GMAIL API------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //

    let emailLinkPage=(request,response)=> {
        response.send(`<!DOCTYPE html>
                        <html>
                          <head>
                            <title>Gmail API Quickstart</title>
                            <meta charset="utf-8" />
                          </head>
                          <body>
                            <p>Please sign in to the email that you want to link: </p>
                            <button id="authorize_button" style="display: none;">Authorize</button>
                            <button id="signout_button" style="display: none;">Sign Out</button>
                            <pre id="content" style="white-space: pre-wrap;"></pre>
                            <script type="text/javascript" src="main.js"></script>
                            <script async defer src="https://apis.google.com/js/api.js"
                              onload="this.onload=function(){};handleClientLoad()"
                              onreadystatechange="if (this.readyState === 'complete') this.onload()">
                            </script>
                          </body>
                        </html>`)
    }
// <----------------------------------------------------------------------------------------------------------> //
// <-********************************************************************************************************-> //
// <----------------------------------------------------------------------------------------------------------> //

// <----------------------------------------------------------------------------------------------------------> //
// <------------------------------------------------Home Page ------------------------------------------------> //
// <----------------------------------------------------------------------------------------------------------> //
    let homePage=(request,response)=> {
        response.render('HomePage')
    }
// <----------------------------------------------------------------------------------------------------------> //
// <-********************************************************************************************************-> //
// <----------------------------------------------------------------------------------------------------------> //
    return {
        loginPage,
        loginCheck,

        registerPage,
        registerDone,

        emailLinkPage,

        homePage
        // linking

    }
}