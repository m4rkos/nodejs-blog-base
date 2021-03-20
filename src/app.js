const express = require('express')
const {twig} = require('twig')
const os = require('os')
const pageRoute = require('./routes/pages')
const adminRoute = require('./routes/admin')
const app = express()

let session = require('express-session');
//let path = require('path');

app.set('view engine', 'twig')
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
})

app.set('views', './src/views')
app.use(session({
	secret: 'secret moow',
	resave: true,
	saveUninitialized: true
}));
app.use(express.static('./src/public'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

console.log(os.hostname())

// HTTPS
if(os.hostname() != process.env.ENV_DEV1 && os.hostname() != process.env.ENV_DEV2){
    app.get('*', (req, res, next) => {
        if (req.headers['x-forwarded-proto'] != 'https') {
            res.redirect("https://" + req.headers.host + req.url)
        } else {
            next()
        }
    })
}

// Routes
pageRoute(app)
adminRoute(app)

app.use(function (req, res, next){     
    res.status(404).send("404")    
})

module.exports = app