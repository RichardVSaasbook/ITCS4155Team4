var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

//Authenticate Schema
var Gallery =  new Schema ({
	
	//Columns
	courseId:	{type: String, default: ''},
	assignmentId:	{type: String, default: ''},
	galleryName:	{type: String, default: ''}

})

mongoose.model('Gallery', Gallery);