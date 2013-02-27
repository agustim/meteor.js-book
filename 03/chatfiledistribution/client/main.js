Meteor.autorun(function () {
  Meteor.subscribe("messages");
}); 
Template.content.title = function () {
  return "Welcome to chat.";
};

Template.content.events({
  'click input#button' : function () {
    var my_mess = $('#message').val();
    if  (my_mess != "") {
      var my_date = Date.now();
      Meteor.call('createMessage',{text: my_mess, time: my_date});
      $('#message').val("");
    }
  }
});

Template.content.messages = function () {
  return Messages.find({}, { sort: {time: -1} });
}
