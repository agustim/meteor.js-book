
Session.set('survey_id', null);

Meteor.autorun(function () {
  Meteor.subscribe("survey", function(){
  	if(!Session.get('survey_id')) {
  		var first_survey = Survey.findOne({}, {sort: {name: 1}});
    	if (first_survey)
      	Router.setQuiz(first_survey._id);
  	}
  });
}); 

Template.survey.events({
  'click .vote' : function() {
    var survey_id = Session.get('survey_id');
    if (!survey_id) return {}; 
    Meteor.call('voting',{survey_id:survey_id, choice:this.option});
  }
});

Template.survey.ask = function () {
  var survey_id = Session.get('survey_id');
  if (!survey_id) return {}; 
  var data = Survey.findOne({_id: survey_id},{'ask' : true});
  if (data && data['ask']) return data['ask'];
}

Template.survey.options = function () {
  var survey_id = Session.get('survey_id');
  if (!survey_id) return {}; 
  var data = Survey.findOne({_id: survey_id},{'options' : true});
  if (data && data['options']){
    paint_graph('#graph',data['options']);
    return data['options'];
  }
}


var paint_graph = function(div, mydata) {
  $(div).html('');
  var chart = d3.select(div)
      .attr("class", "chart");
  chart.selectAll("div")
      .data(mydata)
      .enter().append("div")
      .style("width", function(d) { return d.votes * 20 + "px"; })
      .text(function(d) { return d.option; });
}

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});