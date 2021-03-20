const controller = require('../controllers/admin_controller');

// Routes
module.exports = (app) =>{
        
    app.get('/login', (req, res) => {        
        controller.login(app, req, res)
    })    
    app.post('/auth', function(req, res) {
        controller.auth(app, req, res)      
    })    
    app.get('/logoff', function(req, res) {	
        controller.logoff(app, req, res)
    })        
    app.get('/admin', function(req, res) {
        controller.admin(app, req, res)
    })
    app.get('/admin-user', function(req, res) {
        controller.adminUser(app, req, res)
    })

}