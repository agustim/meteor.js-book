Meteor.methods({
  voting: function (options){
		options = options || {}; 
    if (! (typeof options.choice === "string" && options.choice.length))
    	throw new Meteor.Error(400, "Some parametres are wrong.");
    var data = Survey.findOne({});
    for(var i=0; i < data.options.length; i++){
    	if (data.options[i].option === options.choice) {
    		data.options[i].votes++;
    	}
    }
    Survey.update(data._id, {$set: {options: data.options}});
  }    
});