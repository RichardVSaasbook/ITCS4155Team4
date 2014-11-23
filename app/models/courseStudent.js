var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


//Authenticate Schema
var CourseStudent =  new Schema ({
	
	//Columns
	courseId:	{type: String, default: ''},
	username:	{type: String, default: ''}

})

mongoose.model('CourseStudent', CourseStudent);