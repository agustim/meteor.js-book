
Meteor.publish("survey", function() {
  return Survey.find();
});

Meteor.startup(function(){ 
	if (Survey.find().count() === 0){
		var data = [
		{ask: "What's your faborite color?",
		 shortname: "color",
		 options: ["red","blue","yellow","green","black","white"]},
		{ask: "What's the best example?",
		 shortname: "example",
		 options: ["1st","2nd","3rd", "4th", "5th"]}
		];

		for(var i=0; i < data.length; i++){
			var opt = data[i].options;
			var answers = [];
			for(var j=0; j < opt.length; j++){
				answers.push({ option:opt[j], votes:0 });
			}
			Survey.insert({ ask:data[i].ask, shortname:data[i].shortname,
										 options: answers });
		}
	}
});