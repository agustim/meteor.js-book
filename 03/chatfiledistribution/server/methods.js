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