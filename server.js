const express = require('express') ;
const hbs = require('hbs') ;
const fs = require('fs') ;
var app = express() ;


hbs.registerPartials(__dirname + '/views/partials'); // partial hbs templates directory

//MIDDLEWARES
// app.use(express.static(__dirname + '/public')) ; // static directory
app.use((req,res,next)=>{
	var log = `${new Date()} ${req.method}  ${req.url}` ;
	fs.appendFile('server.log' , log + '\n' , (error)=>{
		if(error) console.log('Unable to append server.log file.');
	}
	);
	next();
});

app.use(
	(req,res,next)=>{
		res.render('maintenance.hbs');
	}
);

app.use(express.static(__dirname + '/public')) ; // static directory



// these functions can be called from hbs templates
hbs.registerHelper('getCurrentYear' , ()=>{
	return new Date().getFullYear() ;
});
hbs.registerHelper('screamIt' , (text)=>{
	return text.toUpperCase() ;
});

app.set('view engine','hbs'); // telling express what view-engine we want to use

app.get('/' , (req,res)=>{
	// res.send('<h1>Hello Express!</h1>');
	res.render('home.hbs' , {
		pageTitle : 'Home Page!' ,
		welcomeMessage : 'welcome to my website'
	});
});

app.get('/about' , (req,res)=>{
	res.render('about.hbs' , {
		pageTitle : 'About Page'
	}) ;
});


app.listen(3000 , ()=>{
	console.log("Server is up on port 3000") ;
}) ;


// -------------------------------------------------- //

// views - default directory that express uses for templates //
