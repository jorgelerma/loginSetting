// note_routes.js
module.exports = function(app, db) {
    app.post('/notes', (req, res) => {
      // You'll create your note here.
      res.send('Hello');
    });

    app.get('/notes', (req, res) => {
      // You'll create your note here.
      res.send('The server replied your GET request');
    });
  };