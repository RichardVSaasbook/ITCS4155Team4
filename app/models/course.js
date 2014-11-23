//Example Model 
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Authenticate Schema 
var Course = new Schema ({

	//Columns
	courseName:	{type: String, default: ''},
	courseID:	{type: String, default: ''},
	courseTeacher:	{type: String, default: ''}
})




mongoose.model('Course', Course);