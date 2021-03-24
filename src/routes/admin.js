const controller = require('../controllers/admin_controller');

// Routes
module.exports = (app) =>{
        
    app.get('/login', (req, res) => {        
        controller.login(app, req, res)
    })    
    app.post('/auth', (req, res) => {
        controller.auth(app, req, res)      
    })    
    app.get('/logoff', (req, res) => {	
        controller.logoff(app, req, res)
    })      
    
    app.get('/admin', (req, res) => {
        controller.admin(app, req, res)
    })

    // Users
    app.get('/admin-user', (req, res) => {
        controller.adminUser(app, req, res)
    })    
    app.post('/admin-user', (req, res) => {
        controller.adminUserInsert(app, req, res)
    })    
    app.get('/admin-user-access', (req, res) => {
        controller.adminUserAccess(app, req, res)
    })
    app.post('/admin-user-access', (req, res) => {
        controller.adminUserAccessInsert(app, req, res)
    })

    app.get('/admin-user-json', (req, res) => {
        controller.adminUserJson(app, req, res)
    })
    app.get('/admin-permition-json', (req, res) => {
        controller.adminPermitionJson(app, req, res)
    })

    // Permitions
    app.get('/admin-permition', (req, res) => {
        controller.adminPermition(app, req, res)
    })
    app.post('/admin-permition', (req, res) => {
        controller.adminPermitionInsert(app, req, res)
    })

    // Menu
    app.get('/admin-menu', (req, res) => {
        controller.adminMenu(app, req, res)
    })
    app.get('/admin-submenu', (req, res) => {
        controller.adminSubMenu(app, req, res)
    })

    // Page / Post
    app.get('/admin-page', (req, res) => {
        controller.adminPage(app, req, res)
    })
    app.post('/admin-page', (req, res) => {
        controller.adminPageInsert(app, req, res)
    })
    app.get('/admin-post', (req, res) => {
        controller.adminPost(app, req, res)
    })
    app.post('/admin-post', (req, res) => {
        controller.adminPostInsert(app, req, res)
    })
    
    // Setting
    app.get('/admin-setting', (req, res) => {
        controller.adminSetting(app, req, res)
    })
    app.post('/admin-setting', (req, res) => {
        controller.adminSettingInsert(app, req, res)
    })
    
    app.get('/admin-video', (req, res) => {
        controller.adminVideo(app, req, res)
    })
    app.post('/admin-video', (req, res) => {
        controller.adminVideoInsert(app, req, res)
    })

}