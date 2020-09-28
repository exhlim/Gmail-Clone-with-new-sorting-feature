const React = require('react');

export default class LoginPage2 extends React.Component {
    render() {
        return (
            <html>
            <head>
            <link rel="icon" href="./public/gmail.svg"/>
            <title>Gmail</title>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <link href="./public/loginPage.css" rel="stylesheet" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            <script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
            </head>

            <section class="login-block">
            <div class="container">
            <div class="row">
            <div class="col-md-4 login-sec">
            <h2 class="text-center">Login Now</h2>
            <form class="login-form" method="POST" action="/login">
            <div class="form-group">
            <label for="exampleInputEmail1" class="text-uppercase">Username</label>
            <input type="text" name="username" class="form-control" placeholder="" />

            </div>
            <div class="form-group">
            <label for="exampleInputPassword1" class="text-uppercase">Password</label>
            <input type="password" name="password" class="form-control" placeholder="" />
            </div>


            <div class="form-check">
            <label class="form-check-label">
            </label>
            <button type="submit" class="btn btn-login float-right">Submit</button>
            </div>

            </form>
            <form action="/register">
                <button  class="btn btn-login float-left" style={{position: 'absolute', top: "62%"}} className="register-button">Register</button>
            </form>
            </div>
            <div class="col-md-8 banner-sec">
            <div id="carouselExampleIndicators" class="carousel slide">
            <div class="carousel-caption d-none d-md-block">
            <div class="banner-text" />
            <h2>Welcome to my Gmail Clone</h2>
            <ol>
                <li >Login or Register with a new account.</li>
                <li >Link your gmail account and authorize this application.</li>
                <li >For security and privacy reasons, this application only has a read-only permission and all emails retrieved are not stored in any databases.</li>
                <li >To remove access, click <a target="_blank" href="https://myaccount.google.com/security">here</a> and scroll down to "Manage third-party access" and remove "Mail Retriever".</li>
            </ol>
            <h2 style={{color: 'brown'}}>What is Crux?</h2>
            <ol>
                <li style={{color: 'brown'}}>Crux is a feature I created that sorts emails base on Keywords.</li>
                <li style={{color: 'brown'}}>On the left side bar, define the name for your tab and the keywords to filter out emails.</li>
                <li style={{color: 'brown'}}>Be specific with your keywords and sperate each keyword with a new line:</li>
                <ul>
                    <li style={{color: 'brown'}}>Project Swift</li>
                    <li style={{color: 'brown'}}>Swift</li>
                </ul>
                <li style={{color: 'brown'}}>To change the keywords of a tab, specify the same tab name (Case sensitive) and input your new keywords. Click <a target="_blank" href="https://github.com/exhlim/Gmail-Clone-with-new-sorting-feature">here</a> for more details on this project.</li>
            </ol>
            </div>
            </div>
            </div>
            </div>
            </div>
            </section>
            </html>
            )
    }
}