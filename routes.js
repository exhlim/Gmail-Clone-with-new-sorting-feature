module.exports = (app, allModels) => {

    const controllerCallBacks = require('./controllers/control')(allModels);

    app.get('/', controllerCallBacks.loginPage)
    app.post('/login', controllerCallBacks.loginCheck)

    app.get('/register', controllerCallBacks.registerPage);
    app.post('/register', controllerCallBacks.registerDone);

    app.get('/emailinput', controllerCallBacks.emailLinkPage)

    app.get('/mail', controllerCallBacks.homePage)

    app.post('/insert-data', controllerCallBacks.insertData)

    app.get('/:id', controllerCallBacks.getIndividualMail)
}