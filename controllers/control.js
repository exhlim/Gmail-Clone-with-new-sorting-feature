const sha256=require('js-sha256');
const cookieParser = require('cookie-parser');
let SALT = "exhlim";
let reference = "";
let sortedEmails;
let username;
let globalDataVar;
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
                let params = {
                    emails: sortedEmails,
                    keywordData: globalDataVar
                }
                response.render('MailPage', params)
            } else {
                response.send("You are tempering");
            }
        }
    }
    let loginCheck=(request,response)=> {
        username = request.body.username
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
                db.poolRoutes.getKeywordDataFX([username], (err,data)=> {
                    globalDataVar = data.rows;
                })
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
                response.redirect('/emailinput')
            }
        })
    }
    let registerPage=(request,response)=> {
        response.render("RegisteringPage")
    }
    let registerDone=(request,response)=> {
        username = request.body.username
        let params = [
        request.body.username,
        ]
        db.poolRoutes.registerCheckFX(params, (err,results)=> {
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
        <title>Gmail</title>
        <link rel="icon" href="./public/gmail.svg"/>
        <meta charset="utf-8" />
        </head>
        <body>
        <p>Please sign in to the email that you want to link: </p>
        <button id="authorize_button" style="display: none;">Authorize</button>
        <button id="signout_button" style="display: none;">Stop</button>
        <pre id="content" style="white-space: pre-wrap;"></pre>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
        <script type="text/javascript" src="./public/main.js"></script>
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
let insertData = (request, response) =>{
    sortedEmails = [...request.body.body]
    sortedEmails.sort(function(a,b) {
        return b.rawDate - a.rawDate;
    });
    response.send()
}
let homePage=(request,response)=> {
    let params = {
        emails: sortedEmails,
        keywordData: globalDataVar
    }
    if(!request.cookies['loggedIn']) {
        response.render('LoginPage')
    } else {
        let reference = request.cookies['reference']
        let cookieValue = request.cookies['loggedIn']
        if(cookieValue === sha256(`true${SALT}-${reference}`)) {
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
                let params = {
                    emails: sortedEmails,
                    keywordData: globalDataVar
                }
                response.render('MailPage', params)
            } else {
                response.render('LoginPage')
            }
        }
    }
    let getIndividualMail=(request,response)=> {
        let individualemail = [];
        function filter(emails) {
            emails.forEach(email=> {
                if(email.mailid == request.params.id) {
                    individualemail.push(email)
                }
            })
        }
        filter(sortedEmails)
        let params = {
            emails : sortedEmails,
            keywordData: globalDataVar,
            indemail : individualemail
        }
        response.render('IndMailPage', params)
    }
    let insertCrux=(request,response)=> {
        let params = {
            emails: sortedEmails
        }
        if(request.body.keywords == undefined || request.body.tabName == undefined) {
            response.render('MailPage', params)
        } else {
            let arrayOfKeywords = request.body.keywords.split("\r\n")
            arrayOfKeywords = arrayOfKeywords.join('!!!!');
            db.poolRoutes.checkTabNameFX([request.body.tabName, username], (err,results)=> {
                if(results.rows.length !== 0) {
                    console.log(username)
                    let object2 = {
                        emails: sortedEmails,
                        keywordData: globalDataVar
                    }
                    db.poolRoutes.updateKeywordsFX([arrayOfKeywords,request.body.tabName], (err,results)=> {
                        db.poolRoutes.getKeywordDataFX([username], (err,data)=> {
                            let object2 = {
                                emails: sortedEmails,
                                keywordData: data.rows
                            }
                            globalDataVar = data.rows;
                            response.render('MailPage', object2)
                        })
                    })
                } else {
                 let insertKeywords = [
                    arrayOfKeywords,
                    username
                 ]
                 db.poolRoutes.insertKeywordFX(insertKeywords, (err, id)=> {
                    let insertTabname = [
                        request.body.tabName,
                        username,
                        id.rows[0].id
                    ]
                    db.poolRoutes.insertTabNameFX(insertTabname, (err,result)=> {

                        db.poolRoutes.getKeywordDataFX([username], (err,data)=> {
                            let object = {
                                emails: sortedEmails,
                                keywordData: data.rows
                            }
                            globalDataVar = data.rows;
                            response.render('MailPage', object)
                        })
                    })
                })
             }
         })
     }
}


     let logout=(request,response)=> {
        // request.cookies["reference"].Expires = DateTime.Now.AddDays(-1);
        // request.cookies["loggedIn"].Expires = DateTime.Now.AddDays(-1);
        // request.cookies["G_AUTHUSER_H"].Expires = DateTime.Now.AddDays(-1);
        // request.cookies.remove('reference')
        // request.cookies.remove('loggedIn')
        // request.cookies.remove('G_AUTHUSER_H')
        // request.cookies["reference"] = ""
        // request.cookies["loggedIn"] = ""
        // request.cookies["G_AUTHUSER_H"] =
        response.cookie("loggedIn", "")
        response.cookie("reference", "")
        response.cookie("G_AUTHUSER_H", "")
        response.render('LoginPage')
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

    homePage,
    insertData,

    getIndividualMail,

    insertCrux,

    logout

}
}