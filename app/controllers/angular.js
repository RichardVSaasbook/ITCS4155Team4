var mongoose = require('mongoose')

exports.index = function (req, res) {
	res.render('app', {
		title: 'Angular',
		})

}
