#!/bin/env node

var express = require('express')
  , app = express()
  , http = require('http')
  , redirects = require('./static_redirects');


app.configure(function() {
	// Openshift
  	// app.set('port', process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000);
	// app.set('ip', process.env.OPENSHIFT_NODEJS_IP || process.env.IP || '127.0.0.1')
	// Heroku
	app.set('port', (process.env.PORT || 5000));
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(app.router);
});

app.get('/f/:forum_id', function(req, res) {
	res.redirect('https://forums.owlgaming.net/index.php?app=forums&module=forums&controller=forums&id=' + req.params.forum_id);
});

app.get('/fm/:form_id', function(req, res) {
	res.redirect('https://forums.owlgaming.net/index.php?app=form&module=forms&controller=index&do=viewform&id=' + req.params.form_id);
});

app.get('/:thread_id(\\d+)', function(req, res) {
	res.redirect('https://forums.owlgaming.net/index.php?showtopic=' + req.params.thread_id);
});

app.get('/u/:user_id', function(req, res) {
	res.redirect('https://forums.owlgaming.net/index.php?app=core&module=members&controller=profile&id=' + req.params.user_id);
});

/*app.get('/lb/*', function(req, res) {
	res.redirect('http://linkbook.owlgaming.net/index.php?do=/' + req.params[0]);
})*/

app.get('/fb/:page_name', function(req, res) {
	res.redirect('https://findbook.owlgaming.net/' + req.params.page_name);
})

app.get('/fbp/:page_title', function(req, res) {
	res.redirect('https://findbook.owlgaming.net/pages/' + req.params.page_title);
})

app.get('/fbg/:group_name', function(req, res) {
	res.redirect('https://findbook.owlgaming.net/groups/' + req.params.group_name);
})

app.get('/b/:bug_id', function(req, res) {
	res.redirect('https://bugs.owlgaming.net/view.php?id=' + req.params.bug_id);
})

app.get('/t/:ticket_id', function(req, res) {
	res.redirect('https://owlgaming.net/support/' + req.params.ticket_id);
})

Object.keys(redirects).forEach(function(key) {
	var value = redirects[key];
	app.get('/' + key, function(req, res) {
		res.redirect(value);
	})
})

app.get('/', function(req, res) {
	res.render('index', {routes: app.routes.get})
});

http.createServer(app).listen(app.get('port'), app.get('ip'));
