module.exports = function(app, passport, streamable) {

    //Allows users to by pass authentication to api requests
    //if they have a valid api key.
    var hasAccess = function(req, res, next) {

        //authenticated
        if (req.isAuthenticated()) return next()

        var mongoose = require('mongoose'),
            User = mongoose.model('User')

            if (!req.query.apikey) return next(
                "Not logged in: you must provide" +
                " an apikey as a query variable")

            User
                .findOne({
                    apikey: req.query.apikey
                })
                .exec(function(err, user) {
                    if (!user)
                        return next("your api key is invalid")
                    req.user = user
                    return next()
                })
    }

    //authentication
    var isLoggedIn = function(req, res, next) {
        if (req.isAuthenticated()) return next()
        res.redirect("/login")
    }

    var handleError = function(err, req, res, next) {
       
        //if provided an object
        if (err.err) return errObj(err) 
       
        //else provided a string
        return res.json(503, {
            "error": err
        })
       
        function errObj(err) {
            
            var msg = {} 

            if (err.tip) msg.tip = err.tip
            if (err.err) msg.error = err.err

            return res.json(503, msg)
        }
    }

    //user routes
    var users = require('../app/controllers/users')
    app.get('/signup', users.signup, handleError)

	//app.get('/flashLoginMessage', users.flashLoginMessage)

    app.get('/login', users.login, handleError)
    app.get('/home', isLoggedIn, users.display, handleError)
    app.get('/home/:username', isLoggedIn, users.display, handleError)

    app.get('/users/apikey', users.getkey, handleError)
    app.get('/logout', users.logout)

    //general routes
    app.get('/', users.index);

    //stream routes

    var streams = require('../app/controllers/streams.js')
    app.get('/streams/:domain/*',
        hasAccess, streamable, streams.getSource, handleError)
    app.get('/streams/:domain',
        hasAccess, streamable, streams.getSource, handleError)

    //assignment routes
    var assignments = require('../app/controllers/assignments.js')
    app.post('/assignments/:assignmentID',
        hasAccess, assignments.upload, handleError)
    app.post('/assignments/:assignmentID/share/:value',
        hasAccess, assignments.updateVisibility, handleError)
    app.post('/assignments/:assignmentID/vistype/:value',
        hasAccess, assignments.updateVistype, handleError)
    //app.get('/assignments/:username/:assignmentNumber', assignments.viewD3)

    //gallery routes
    var gallery = require('../app/controllers/gallery.js')
    //app.get('/assignments/:assignmentID', gallery.view)

    app.post('/users/session',
        passport.authenticate('local-log', {
            successRedirect: '/angular',
            failureRedirect: '/angular/#/login',
            failureFlash: true
        }))
    //, 
    //users.session)

    app.get('/connect/twitter',
        passport.authorize('twitter-authz', {
            failureRedirect: '/angular/#/login'
        })
    )

    app.get('/auth/twitter/callback',
        passport.authorize('twitter-authz', {
            failureRedirect: '/angular/#/login'
        }),
        function(req, res) {
            var user = req.user
            var account = req.account
            // Associate the Twitter account with the logged-in user.
            account.email = user.email
            account.save(function(err) {
                if (err) return (err)
                res.redirect('/angular/#/home')

            })
        }
    )


	/****************************************
	 * Routes created by ITCS 4155 - Group 4
     ****************************************/
	var angular = require('../app/controllers/angular')
	var angularUsers = require('../app/controllers/angular_users.js')
    var angularAssignments = require('../app/controllers/angular_assignments.js')
    var angularGallery = require('../app/controllers/angular_gallery.js')

	app.get('/angular', angular.index)

    app.post('/users', angularUsers.createAngular, handleError)
	app.get('/user-info', angularUsers.info)
	app.get('/csrf', angularUsers.csrf)
	app.post('/logout', angularUsers.userLogout)
    app.delete('/users/:id', isLoggedIn, angularUsers.deletePerson)

    app.get('/assignments/:assignmentID/:username', angularAssignments.show, handleError)

    app.get('/assignments/:assignmentNumber', angularGallery.view, handleError)
	app.get('/:username/assignments', angularGallery.viewAssignments, handleError)
}
