Template.navsurveys.surveys = function() {
  return Survey.find({}).fetch();
}

Template.navsurveys.isActive = function() {
  var survey_id = Session.get('survey_id');
  return (survey_id && (survey_id === this._id));
}