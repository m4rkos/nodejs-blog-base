const controller = require('../controllers/pages_controller');
// Routes
module.exports = (app) =>{
    // home
    app.get('/', (req, res) => {                
        controller.home(app, req, res)
    })
    app.get('/:id', (req, res) => {    
        //let id = req.params.id
        controller.home(app, req, res)
    })
    app.post('/', (req, res) => {        
        controller.serachHome(app, req, res)
    })
}