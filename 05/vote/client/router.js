var VoteRouter = Backbone.Router.extend({
  routes: {
    ":survey_id": "main"
  },
  main: function (survey_id) {
    Session.set("survey_id", survey_id);
  },
  setQuiz: function (survey_id) {
    this.navigate(survey_id, true);
  }
});

Router = new VoteRouter;