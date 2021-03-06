module.exports = function(app) {

   var users = require('../controllers/user.controller.js');

   // Create a new User
   app.post('/signup', users.signup);

   // Log in
   app.post('/login', users.login);

   // Get self info
   app.get('/me', users.getSelf);

   // Add friend
   // app.put('/addFriend', users.addFriend);
   app.post('/friend', users.addFriend);

   // Remove friend
   // app.put('/deleteFriend', users.deleteFriend);
   app.delete('/friend', users.deleteFriend);

   // Get all users
   app.get('/users', users.getAll);

   // Retrieve all Notes
   // app.get('/notes', notes.findAll);

   // Retrieve a single Note with noteId
   // app.get('/notes/:noteId', notes.findOne);

   // Update a Note with noteId
   // app.put('/notes/:noteId', notes.update);

   // Delete a Note with noteId
   // app.delete('/notes/:noteId', notes.delete);
}