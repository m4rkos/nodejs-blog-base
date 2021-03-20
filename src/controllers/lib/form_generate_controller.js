// form_generate_controller
module.exports.generateForm = (app, req, res) => {

    try {
        const db = require('../../../config/database_mysql')   
        let conn = db()

        let sql = `SHOW TABLES `
        // NOT LIKE '%mysql_migrations_%'
        
        conn().query(sql, (error, result, fields) => {     
            conn().end()  
            console.log(result)
            let i = 0
            result.forEach(tbl => {
                console.log(i + ' - ' + result)
                i ++
                // let query_now = `select * from ${tbl} `
                // console.log(query_now)
                // conn().query(query_now, (error2, result2, fields2) => {    
                //     console.log(result2)
                // })
                // conn().end()
            });           
            res.json({
                title: 'Tables',
                data: result,                
            })    
        })    
        //conn().end()
        //conn().on("end", () => console.log('DB Done :)'))

    } catch (error) {        
        res.redirect('pages/home')        
    }   

}

// const sqlExec = async (sql) =>{ 
//     const db = require('../../../config/database_mysql')   
//     let conn = db()
        
//     conn().query(sql, (error, result, fields) => {       
//         conn().end()
//         conn().on("end", () => console.log('DB Done :)'))        
//         return result                  
//     })    
        
// }