Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Template.content.title = function () {
    return "Welcome to chat.";
  };

  Template.content.events({
    'click input#button' : function () {
      var my_name = $('#name').val();
      var my_mess = $('#message').val();
      if ( (my_name != "") &&  (my_mess != "") ){
        var my_date = Date.now();
        Messages.insert({name: my_name, text: my_mess, time: my_date});
        $('#name').val("");
        $('#message').val("");
      }
    }
  });

  Template.content.messages = function () {
    return Messages.find({}, { sort: {time: -1} });
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {

  });
}
