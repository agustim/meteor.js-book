Messages = new Meteor.Collection('messages');

if (Meteor.isClient) {
  Meteor.autorun(function () {
    Meteor.subscribe("messages");
  }); 
  Template.content.title = function () {
    return "Welcome to chat.";
  };

  Template.content.events({
    'click input#button' : function () {
      var my_mess = $('#message').val();
      if  (my_mess !== "") {
        var my_date = Date.now();
        Meteor.call('createMessage',{text: my_mess, time: my_date});
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
    Meteor.publish("messages", function() {
      return Messages.find();
    });
    Messages.allow({
      insert: function(userId, message){
        return false;
      }
    });
    Meteor.methods({
      createMessage: function (options){
        options = options || {}; 
        if (! (typeof options.text === "string" && options.text.length))
          throw new Meteor.Error(400, "Some parametres are wrong.");
        if (! this.userId)
          throw new Meteor.Error(403, "You must be logged in");
        datenow = Date.now();
        return Messages.insert({
          owner: this.userId,
          name: Meteor.user().emails[0].address,
          text: options.text,
          time: (datenow <= options.time) ? datenow : options.time
        });
      }    
    });
  });
}
