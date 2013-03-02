Messages = new Meteor.Collection('messages');

if Meteor.isClient 
  Template.content.title = -> "Welcome to chat."

  Template.content.events(
    'click input#button' : ->
      my_name = $('#name')
      my_mess = $('#message')
      if (my_name.val?() isnt "") and (my_mess.val?() isnt "") 
        Messages.insert(
           name: my_name.val(), 
           text: my_mess.val(), 
           time: Date.now()
        )
        my_name.val("")
        my_mess.val("")  
  );

  Template.content.messages = -> Messages.find({}, { sort: {time: -1} })

if Meteor.isServer 
  Meteor.startup( -> )

