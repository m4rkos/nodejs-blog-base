module.exports.auth = (app, req, res) => {
    const db = require('../../config/database_mysql')   
    let conn = db()

    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        conn().query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/admin');
            } else {
                res.send('Incorrect Username and/or Password!');
            }			
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
}

module.exports.logoff = (app, req, res) => {
    if (req.session.loggedin) {
        req.session.loggedin = false;	
        res.redirect('/login');	
    } else {
        res.redirect('/admin');	
    }	
}

module.exports.login = (app, req, res) => {
    if (!req.session.loggedin) {
        res.render('pages/login', {
            title: 'Login',
            data: null,
            id: req.params.id ? parseInt(req.params.id) : 0,
        })
    } else {
        res.redirect('/admin');
    }
}

module.exports.admin = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Admin',
            data: null,  
            logged: true,   
            username: req.session.username,                        
        })        
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })
    }
}

module.exports.adminUser = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Users',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/accounts/form.twig',            
        })        
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })
    }
}