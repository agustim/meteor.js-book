
Meteor.publish("survey", function() {
  return Survey.find();
});

Meteor.startup(function(){ 
	if (Survey.find().count() === 0){
		var data = {ask: "What's your faborite color?",
		 options: ["red","blue","yellow","green","black","white"]};

		var answers = [];
		for(var j=0; j < data.options.length; j++){
			answers.push({ option:data.options[j], votes:0 });
		}
		Survey.insert({ ask:data.ask, options: answers });
	}
});