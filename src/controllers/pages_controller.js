module.exports.home = (app, req, res) => {
        
    let query = ''

    if( req.params.id ){        
        query = `where id_product_db = ${req.params.id}`
    }
    if( req.body.name ){
        query = `where name like '%${req.body.name}%'`
    }    

    try {
        const db = require('../../config/database_mysql')   
        let conn = db()

        let sql = `SELECT * FROM products ${query}`
        
        conn().query(sql, (error, result, fields) => {                        
            res.render('pages/home', {
                title: 'Home page',
                data: result,
                id: req.params.id ? parseInt(req.params.id) : 0,        
            })    
        })    
        conn().end()
        conn().on("end", () => console.log('DB Done :)'))

    } catch (error) {
        res.render('pages/home', {
            title: 'Home page',
            data: error,
            id: req.params.id ? parseInt(req.params.id) : 0,        
        })
    }         
}

module.exports.serachHome = (app, req, res) => {
        
    let query = ''

    if( req.params.id ){        
        query = `where id_product_db = ${req.params.id}`
    }
    if( req.body.name ){
        query = `where name like '%${req.body.name}%'`
    }    

    try {
        const db = require('../../config/database_mysql')   
        let conn = db()

        let sql = `SELECT * FROM products ${query}`
        
        conn().query(sql, (error, result, fields) => {                        
            res.json({
                title: 'Home page',
                data: result,
                id: req.params.id ? parseInt(req.params.id) : 0,        
            })    
        })    
        conn().end()
        conn().on("end", () => console.log('DB Done :)'))

    } catch (error) {        
        res.redirect('pages/home')        
    }         
}