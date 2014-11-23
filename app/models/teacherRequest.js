var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


//Authenticate Schema
var TeacherRequest =  new Schema ({
	
	//Columns
	username:	{type: String, default: ''}

})

mongoose.model('TeacherRequest', TeacherRequest);