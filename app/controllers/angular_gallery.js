var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Account = mongoose.model('Account'),
    Assignment = mongoose.model('Assignment')

exports.view = function(req, res) {

    var getUsername = function(users, usernames, cb) {
        if (users.length == 0) return cb(usernames)
        var user = users.pop()
        User
            .findOne({
                "email": user
            })
            .exec(function(err, user) {
                if (err) return null;
                if (user) usernames.push(user.username)
                getUsername(users, usernames, cb)
            })
    }

    if (!req.params.assignmentNumber) 
        return next("no assignment number provided") 

    Assignment
        .find({
            assignmentID: req.params.assignmentNumber,
            shared: true
        })
        .exec(function(err, assignmentResult) {
            if (err) return next(err)
                
            if (!assignmentResult) return next("could not find " +
                "assignemnt " + req.params.assignmentNumber)

            var users = []
            for (i = 0; i < assignmentResult.length; i++)
                users.push(assignmentResult[i].email)

            getUsername(users, [], function(usernames) {
				var response = {}
				response.data = usernames
				res.setHeader('Content-Type: application/json')
				res.end(JSON.stringify(response))
            })
        })
}

exports.viewAssignments = function(req, res) {
    if (!req.params.username) 
        return next("no username provided")

	//var email = "rvoelker@uncc.edu"
    User
        .findOne({
            username: req.params.username
        })
        .exec(function(err, user) {
            if (err) return null;
            email = user.email
        })

    Assignment
        .find({
            email: email
        })
        .exec(function(err, assignmentResult) {
            if (err) return next(err)
                
            if (!assignmentResult) return next("could not find " +
                "user " + req.params.username)

		    var assignments = []
		if (req.params.username == req.user.username) {
		    for (i = 0; i < assignmentResult.length; i++)
		        assignments.push(assignmentResult[i].assignmentID)
		}

		var response = {}
		response.data = assignments
		res.setHeader('Content-Type: application/json')
		res.end(JSON.stringify(response))
        })
}
