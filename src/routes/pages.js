const controller = require('../controllers/pages_controller');
const lib = require('../controllers/lib/form_generate_controller');

// Routes
module.exports = (app) =>{
    // home
    app.get('/', (req, res) => {                
        controller.home(app, req, res)
    })
    app.get('/post/:id', (req, res) => {            
        controller.home(app, req, res)
    })
    app.post('/', (req, res) => {        
        controller.serachHome(app, req, res)
    })
    app.get('/angular', (req, res) => {
        res.render('pages/angular', {title: 'Angular Exemplo'})       
    })

    app.get('/tables', (req, res) => {
        lib.generateForm(app, req, res)
    })
}