var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Account = mongoose.model('Account'),
	Assignment = mongoose.model('Assignment'),
	treemill = require('treemill')

exports.show = function (req, res, next) {
    
    this.next = next 
    var assignmentID = req.params.assignmentID
    var username = req.params.username
    var apikey = req.query.apikey 
    sessionUser = null
    if (typeof req.user != "undefined") sessionUser = req.user
    User
        .findOne({username: username})
        .exec(function(err, usr){
            if (err) return next(err) 
            if (!usr) 
                return next("couldn't find the username "+username) 
           
            getAssignment(req, res, next, usr.email, function (assign) {
               
                //Test whether user has permission to view vis
                testByUser(res, req, username, assign, function (){
                    testByKey(res, apikey, username, assign, null)
                })
            })
        })

    function getAssignment (req, res, next, email, cb) {
        assignmentID = req.params.assignmentID
        next = next
        Assignment
            .findOne({
                email: email,
                assignmentID: req.params.assignmentID 
            })
            .exec(function (err, assignment) {
                if (err) return next(err) 
                if (!assignment) return next("could not find assignment") 
                
                if (assignment.shared!==true) return cb(assignment)
                return renderVis(res, assignment)         
            })
    }
    
    
    //find whether there is a session, then test
    function testByUser (res, req, username, assign, nextTest) {
        if (sessionUser) {
            return testAndMoveOn(
                res, sessionUser.username, username, assign, nextTest) 
        } else {
            if (nextTest) return nextTest()
            else
                return testAndMoveOn(res, true, false, assign, null) 
        }
    }
    
    //find user by key, then test
    function testByKey (res, apikey, username, assign, nextTest) {
        if (apikey) {
            User
                .findOne({apikey:apikey})
                .exec(function (err, n){
                    if (err) return next (err)
                    if (!n) return next ("Invalid apikey: "+apikey)
                    return testAndMoveOn(
                        res, n.username, username, assign, null) 
                })
        } else {
            if (nextTest) return nextTest()
            else
                return testAndMoveOn(res, true, false, assign, null) 
        }
    }
    
    //compare the usernames and move on
    function testAndMoveOn (res, un1, un2, assign, nextTest) {
        console.log(un1 + " " + un2)
        if (un1 === un2) return renderVis (res, assign)
    
        if (nextTest) return nextTest()
        else return next ("the data you requested is not public")
    }
    
    function renderVis (res, assignment) {
        var owner=false
        if (sessionUser) {
            if (sessionUser.email==assignment.email) owner = true; 
        }
    
        //default visualization
        if (!assignment.vistype) assignment.vistype = "nodelink" 
        //check data for flat vs unflattened representation
        
        var unflatten = function (data) { 
            //check whether the data is already hierachical
            if ("children" in data) return data
            tm = treemill() 
            tree = tm.unflatten(data)       
            return tree
        }
    
        var flatten = function (data) {
            //check whether the data is already flat
            if ("nodes" in data) return data 
            tm = treemill() 
            tree = tm.flatten(data)       
            return tree 
        }

        data = assignment.data.toObject()
        data = data[0]
        
        if (assignment.vistype == "tree") data = unflatten(data)   
        else data = flatten(data) 
        
        vistype = assignment.vistype 
        if ("error" in data) vistype = "error"

		var response = {}
		response.data = data
		response.vistype = vistype
		response.shared = assignment.shared
		response.owner = owner
		res.setHeader('Content-Type: application/json')
		res.end(JSON.stringify(response))
    }
}