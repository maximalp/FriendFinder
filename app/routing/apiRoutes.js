'use strict';

// Data Loading

var friendData = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });



  app.post("/api/friends", function(req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body-parser middleware

    console.log("body: " + JSON.stringify(req.body));
    var user = req.body;

    var matchedFriend = bestMatch(user);
    friendData.push(user);

    console.log("returned matched friend name " + matchedFriend.name);
    res.json(matchedFriend);



  });

  //function to get the total difference between all the question answers (within two friend arrays)
  function friendScoreTotalDiff(friendScore1, friendScore2) {
    var total = 0;
      for(var i=0; i < friendScore1.length; i++)
      {
      var diff = Math.abs(friendScore1[i] - friendScore2[i]);
      total = total + diff;
      };
      return total;
    };


  function bestMatch (currentUser)
  {
    if (friendData.length === 0)
    {
    var user = {
    name: "No friends to compare",
    photo: "",
    };
    return user;
    };

    console.log("name for current user " + currentUser.name);
    console.log("image" + currentUser.photo);
    console.log("score 1 " + currentUser.scores[0]);


    var bestFriend = friendData[0];
    var minDiff = friendScoreTotalDiff(currentUser.scores, bestFriend.scores);

      for (var i = 0; i < friendData.length; i++)
      {
        var diff = friendScoreTotalDiff(currentUser.scores, friendData[i].scores);

        if (diff < minDiff)
        {
        minDiff = diff;
        bestFriend = friendData[i];

        };

      };

      return bestFriend;

  };

  // ---------------------------------------------------------------------------
  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];


    console.log(friendData);



  });
};
