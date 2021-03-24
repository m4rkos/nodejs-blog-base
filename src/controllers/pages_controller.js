module.exports.home = (app, req, res) => {
        
    let query = ''

    if( req.params.id ){        
        query = `where id_user = ${req.params.id}`
    }
    if( req.body.name ){
        query = `where fullname like '%${req.body.name}%'`
    }    

    try {
        const db = require('../../config/database_mysql')   
        let conn = db()

        let sql = `SELECT * FROM blog_sys_user ${query}`
        
        conn().query(sql, (error, result, fields) => {                                    
            res.render('pages/home', {
                title: 'Home page',
                data: result,
                search: true,
                image: getImage(result.length),
                id: req.params.id ? parseInt(req.params.id) : 0,        
            })    
        })    
        conn().end()
        conn().on("end", () => console.log('DB Done :)'))

    } catch (error) {
        res.render('pages/home', {
            title: 'Home page',
            data: null,
            error: error,
            search: true,
            id: req.params.id ? parseInt(req.params.id) : 0,        
        })
    }         
}

module.exports.serachHome = (app, req, res) => {
        
    let query = ''

    if( req.params.id ){        
        query = `where id_user = ${req.params.id}`
    }
    if( req.body.name ){
        query = `where fullname like '%${req.body.name}%'`
    }    

    try {
        const db = require('../../config/database_mysql')   
        let conn = db()

        let sql = `SELECT * FROM blog_sys_user ${query}`
        
        conn().query(sql, (error, result, fields) => {      
            let img = getImage(result.length)
            console.log(img)
            res.json({
                title: 'Home page',
                data: result,
                image: img,
                id: req.params.id ? parseInt(req.params.id) : 0,        
            })    
        })    
        conn().end()
        conn().on("end", () => console.log('DB Done :)'))

    } catch (error) {        
        res.redirect('pages/home')        
    }         
}

const getImage = (amount = 0) => {

    const coolImages = require("cool-images")

    if(amount > 0){
        let r = coolImages.many(600, 800, amount)
        return r
    }
    else{
        let r = coolImages.one()
        return r
    }

}