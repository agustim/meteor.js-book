Survey = new Meteor.Collection('survey');

Survey.allow({
  insert: function(userId, message){
    return false;
  },
  update: function(userId, message){
    return false;
  },
  remove: function(userId, message){
    return false;
  }
});
