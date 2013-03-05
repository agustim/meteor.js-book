Meteor.autorun(function () {
  Meteor.subscribe("survey");
}); 

Template.survey.events({
  'click .vote' : function() {
  	Meteor.call('voting',{choice:this.option});
  }
});

Template.survey.ask = function () {
	var data = Survey.findOne({},{'ask' : true});
  if (data && data['ask']) return data['ask'];
}

Template.survey.options = function () {
	var data = Survey.findOne({},{'options' : true});
  if (data && data['options']){
  	paint_graph('#graph',data['options']);
		return data['options'];
	}
}

var paint_graph = function(div, mydata) {
	// Clear old graph
	$(div).html('');
	
	// Paint new graph
	var chart = d3.select(div)
	    .attr("class", "chart");
	chart.selectAll("div")
	    .data(mydata)
	  	.enter().append("div")
	    .style("width", function(d) { return d.votes * 20 + "px"; })
	    .text(function(d) { return d.option; });
}
