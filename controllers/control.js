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
            if(results.rows.length == 0 || username.length == 0 || request.body.password == 0) {
                response.redirect("/");
            } else {
                response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results.rows[0].id).toString())}`), { maxAge: 600000 })
                response.cookie("reference", (`${sha256((results.rows[0].id).toString())}`), { maxAge: 600000 })
                db.poolRoutes.getKeywordDataFX([username], (err,data)=> {
                    globalDataVar = data.rows;
                })
                // REDIRECT TO HOME PAGE AND RENDER OUT EMIALS FROM SQL
                response.redirect('/emailinput')
            }
        })
    }
    let registerPage=(request,response)=> {
        response.render("RegisterPage")
    }
    let registerDone=(request,response)=> {
        username = request.body.username
        let params = [
        request.body.username,
        ]
        db.poolRoutes.registerCheckFX(params, (err,results)=> {
            // If the username already exists render the same login page
            if(results.rows.length !== 0 || username.length == 0 || request.body.password.length == 0) {
                response.redirect('/register')
            } else {
                params.push(sha256(`${request.body.password}`));
                // If the username does not exists render the email input page.
                db.poolRoutes.registerFX(params, (err,results2)=> {
                    response.cookie('loggedIn', sha256(`true${SALT}-${sha256((results2.rows[0].id).toString())}`), { maxAge: 600000 })
                    response.cookie("reference", (`${sha256((results2.rows[0].id).toString())}`), { maxAge: 600000 })
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
            <link rel="icon" href="./public/gmail.svg">
            <title>Gmail</title>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" >
            <link href="./public/registerPage.css" rel="stylesheet" >
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            </head>
            <section class="login-block">
            <div class="container">
            <div class="row">
            <div class="col-md-4 login-sec">
            <h2 class="text-center">Authentication</h2>
            <button id="authorize_button" style="display: none; position:relative; left: 36%">Authorize</button>
            <button id="signout_button" style="display: none; position:relative; left: 36%">Stop</button>
            </br>
            <pre id="content" style="white-space: pre-wrap;"></pre>
            </div>
            <div class="col-md-8 banner-sec" style="padding-top: 20px">
            <div id="carouselExampleIndicators" class="carousel slide" >
            <div class="banner-text banner-2" style="width: 97%; right: 4.5%">
            <h2 style="color:teal">Welcome to my Gmail Clone</h2>
            <ol>
                <li style="color:teal">Login or Register with a new account.</li>
                <li style="color:teal">Link your gmail account and authorize this application.</li>
                <li style="color:teal">For security and privacy reasons, this application only has a read-only permission and all emails retrieved are not stored in any databases.</li>
                <li style="color:teal">To remove access click <a target="_blank" href="https://myaccount.google.com/security">here</a> and scroll down to "Manage third-party access" and remove "Mail Retriever".</li>
            </ol>
            <h2 style="color: brown">What is Crux?</h2>
            <ol>
                <li style="color: brown">Crux is a feature I created that sorts emails base on Keywords.</li>
                <li style="color: brown">On the left side bar, define the name for your tab and the keywords to filter out emails.</li>
                <li style="color: brown">Be specific with your keywords and sperate each keyword with a new line:</li>
                <ul>
                    <li style="color: brown">Project Swift</li>
                    <li style="color: brown">Swift</li>
                </ul>
                <li style="color: brown">To change the keywords of a tab, specify the same tab name (Case sensitive) and input your new keywords. Click <a target="_blank" href="https://github.com/exhlim/Gmail-Clone-with-new-sorting-feature">here</a> for more details on this project.</li>
            </ol>
            </div>
            </div>
            </div>
            </div>
            </section>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.20.0/axios.min.js"></script>
            <script type="text/javascript" src="./public/main.js"></script>
            <script async defer src="https://apis.google.com/js/api.js"
            onload="this.onload=function(){};handleClientLoad()"
            onreadystatechange="if (this.readyState === 'complete') this.onload()">
            </script>
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
        if(request.body.keywords.length < 0 || request.body.tabName.length < 0) {
            alert("Keywords or Tab name is not defined properly.")
            response.render('MailPage', params)
        } else {
            let arrayOfKeywords = request.body.keywords.split("\r\n")
            arrayOfKeywords = arrayOfKeywords.join('!!!!');
            db.poolRoutes.checkTabNameFX([request.body.tabName, username], (err,results)=> {
                if(results.rows.length !== 0) {
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
        username = "";
        sortedEmails = [];
        globalDataVar = [];
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