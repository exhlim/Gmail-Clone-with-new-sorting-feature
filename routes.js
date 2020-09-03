module.exports = (app, allModels) => {

    const controllerCallBacks = require('./controllers/control')(allModels);

    app.get('/', controllerCallBacks.loginPage);
    app.post('/login', controllerCallBacks.loginCheck)

    app.get('/register', controllerCallBacks.register);
    // app.post('/register', controllerCallBacks.registerDone);

}