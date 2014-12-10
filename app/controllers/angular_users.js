var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Account = mongoose.model('Account'),
    Assignment = mongoose.model('Assignment')

exports.info = function(req, res) {
	var user = req.user
	var response = {}
	if (user) {
		response.email = user.email
		response.username = user.username
		response.apikey = user.apikey

		Account
		    .findOne({ email : user.email })
		    .exec(function (err, accts) {
		        if (err) return next(err)
		        if (!accts) accts = new Account
		        response.acct = accts
		    })
	}

	res.setHeader('Content-Type: application/json')
	res.end(JSON.stringify(response))
}

exports.csrf = function(req, res) {
	var response = {}
	response.csrf = req.csrfToken()
	res.setHeader('Content-Type: application/json')
	res.end(JSON.stringify(response))
}

exports.createAngular = function (req, res) {
    console.log("Creating user: "+ req.body.email)
    var user = new User(req.body)
    user.provider = 'local'
    user.generateKey()
    user.save(function (err) {
        if (err) {
            return res.render('users/signup', {
                    errors: (err.errors),
                    user: user,
                    title: 'Sign up'
             })
        }
  
        // manually login the user once successfully signed up
        req.logIn(user, function(err) {
            if (err) return next(err)
                return res.redirect('/angular')
        })
    })
}

exports.userLogout = function(req, res) {
	req.logout()
	res.end()
}

exports.flashLoginMessage = function(req, res) {
	var response = {}
	response.message = req.flash('loginMessage')
	res.setHeader('Content-Type: application/json')
	res.end(JSON.stringify(response))
}

exports.deletePerson = function (req, res) {
    user = req.user
    console.log("Deleting user: " + user.email)
    
    User
        .findOne({email: user.email})
        .exec(function (err, user) {
            if (err) return next(err)
            if (user) user.remove()
        })
    Assignment
        .find({email: user.email})
        .exec(function(err, assign) {
            if (err) return next(err)
            for (i in assign) {
                console.log(assign[i].assignmentID)
                assign[i].remove()
            }
        })
    Account
        .find({email: user.email})
        .exec(function(err, acct) {
            if (err) return next(err)
            for (i in acct) {
                console.log(acct[i].domain)
                acct[i].remove()
            }
        })
}