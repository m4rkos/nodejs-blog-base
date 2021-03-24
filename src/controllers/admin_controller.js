const db = require('../../config/database_mysql')   
let id = require('uuid');

module.exports.auth = (app, req, res) => {
    let conn = db()

    var username = req.body.username;
    var password = req.body.password;
    if (username && password) {
        conn().query('SELECT * FROM blog_sys_user WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {                
                req.session.loggedin = true;
                req.session.username = results[0].fullname;
                req.session.email = username;
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
            component: '../forms/blog_sys_user/form.twig',            
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

module.exports.adminUserInsert = (app, req, res) => {

    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            token: id.v4(),
            fullname: req.body.fullname,
            resume: req.body.resume,
            email: req.body.email,
            phone: req.body.phone,
            image: req.body.image,
            password: req.body.password
        }

        if (content.fullname && content.email && content.password) {
            conn().query('insert into blog_sys_user set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Users',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Users',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}


module.exports.adminPermition = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Permition',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_permition/form.twig',            
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
module.exports.adminPermitionInsert = (app, req, res) => {

    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            permition_type: req.body.permition_type,
            permition_decription: req.body.permition_decription
        }

        if (content.permition_decription && content.permition_type) {
            conn().query('insert into blog_sys_permition  set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Permition',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Permition',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}


module.exports.adminUserAccess = (app, req, res) => {
    if (req.session.loggedin) {    
        res.render('admin/dashboard', {
            title: 'Users Access',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_user_access/form.twig',            
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
module.exports.adminUserAccessInsert = (app, req, res) => {
    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            id_user: req.body.id_user,
            id_permition: req.body.id_permition
        }

        if (content.id_user && content.id_permition) {
            conn().query('insert into blog_sys_user_access set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'User Access',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'User Access',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}
module.exports.adminUserJson = (app, req, res) => {
    if (req.session.loggedin) {
        let conn = db()
        conn().query('SELECT * FROM blog_sys_user ', function(error, results, fields) {
            if (results.length > 0) {                
                res.json({data: results})
            } else {
                res.send({ data: null });
            }			
            res.end();
        });
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })
    }
}
module.exports.adminPermitionJson = (app, req, res) => {
    if (req.session.loggedin) {
        let conn = db()
        conn().query('SELECT * FROM blog_sys_permition', function(error, results, fields) {
            if (results.length > 0) {                
                res.json({ data: results })
            } else {
                res.send({ data: ['admin', 'aluno', 'normal'] });
            }			
            res.end();
        });
    } else {
    res.render('admin/def_admin', {
        title: 'Message',
        data: null,  
        logged: false,   
        msg: 'Please login to view this page!',
    })
}
}

module.exports.adminMenu = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Menu',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_menu_top/form.twig',            
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

module.exports.adminSubMenu = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Sub Menu',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_menu_footer/form.twig',            
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


module.exports.adminPage = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Pages',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_page/form.twig',            
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
module.exports.adminPageInsert = (app, req, res) => {

    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            title: req.body.title,
            url_name: req.body.url_name,
            resume: req.body.resume,
            content: req.body.content,
            meta_tags: req.body.meta_tags,
            property_img: req.body.property_img,
            property_url: req.body.property_url,
            property_site_name: req.body.property_site_name,
            property_description: req.body.property_description,
            author: req.body.author
        };

        if (content.title && content.url_name && content.content && content.resume) {
            conn().query('insert into blog_sys_page set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Pages',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Pages',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}


module.exports.adminPost = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Posts',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_post/form.twig',            
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
module.exports.adminPostInsert = (app, req, res) => {

    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            title: req.body.title,
            resume: req.body.resume,
            content: req.body.content,
            category: req.body.category,
            link: req.body.link,
            video: req.body.video,
            image: req.body.image
        }

        if (content.title && content.link && content.content && content.resume && content.category) {
            conn().query('insert into blog_sys_post set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Posts',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Posts',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}


module.exports.adminSetting = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Settings',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_setting/form.twig',            
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
module.exports.adminSettingInsert = (app, req, res) => {

    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            email: req.body.email,
            email_smtp: req.body.email_smtp,
            email_port: req.body.email_port,
            email_password: req.body.email_password,
            google_tag: req.body.google_tag,
            faceboo_pixel: req.body.faceboo_pixel,
            pagseguro_key: req.body.pagseguro_key,
            mailchimp_token: req.body.mailchimp_token,
            rd_token_public: req.body.rd_token_public,
            rd_token_private: req.body.rd_token_private,
            site_description: req.body.site_description,
            thumbnail_url: req.body.thumbnail_url,
        }

        if (content.email) {
            conn().query('insert into blog_sys_setting  set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Settings',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Settings',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}


module.exports.adminVideo = (app, req, res) => {
    if (req.session.loggedin) {        
        res.render('admin/dashboard', {
            title: 'Videos',
            data: null,  
            logged: true,   
            username: req.session.username,
            component: '../forms/blog_sys_video/form.twig',            
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
module.exports.adminVideoInsert = (app, req, res) => {
    if (req.session.loggedin) {
        let conn = db()

        let content = {    
            name: req.body.name,
            description: req.body.description,
            url: req.body.url,
        };

        if (content.name && content.description && content.url) {
            conn().query('insert into blog_sys_video set ? ', content, (error, results, fields) => {                
                res.send({
                    status: 200,
                    type: 'Videos',
                    data: results,
                })
                res.end();
            });
        } else {
            res.send({
                status: 304,
                type: 'Videos',
                data: 'Please enter all data!'
            })        
            res.end();
        }
    } else {
        res.render('admin/def_admin', {
            title: 'Message',
            data: null,  
            logged: false,   
            msg: 'Please login to view this page!',
        })        
    }
}