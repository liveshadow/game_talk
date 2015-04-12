var GameData = {

   details: function(data, game_name) {
        $.get("/giantbomb/details.jade", function(template) {
            var html = jade.render(template, {
                data: data.results
            })
            $("#list").html(html);
        })
   },

   gameDetails: function(game_id, game_name) {
        console.log(game_id);
        $(document).ready(function(){    
                $.ajax({
                    url: "http://api.giantbomb.com/game/"+game_id+"/?json_callback=?",
                    type: "get",
                    data: {api_key : apikey.apikey_bomb, format: "jsonp"},
                    dataType: "jsonp",
                    success: function(data){
                        GameData.details(data, game_name);
                    }
                });
            });
    },

   gamer: function(data) {
        $.get("/giantbomb/list.jade", function(template) {
            var html = jade.render(template, {
                data: data
            })
            $("#list").html(html);
        })
    },
    
    searchByName: function(name) {

        $(document).ready(function(){    
            $.ajax({
                url: "http://api.giantbomb.com/search/?json_callback=?",
                type: "get",
                data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game"},
                dataType: "jsonp",
                success: function(data) { 
                    GameData.gamer(data);
                } 
            });
        });
    },

    tweet: function(data) {

      $.get("/giantbomb/twitterlist.jade", function(template) {
          var html = jade.render(template, {
              data: data
          })
        $("#list").html(html);
      })
       
    },
    
    searchTweets: function(name) {
        console.log("Making AJAX Call to /tweet_search (Replace with better way of referencing self)");
        $(document).ready(function(){    
            var test = $.ajax({
                url: "http://localhost:8000/tweet_search", // our heroku address will go here until more clever way of referencing self is found ;) ;D
                type: "get",
                data: {
                    q: name
                },
                dataType: "json", //was jsonp
                success: function(data) { GameData.tweet(data) }, 
                error: function(){ console.log("Error in Ajax Call (oh noes!)"); }
            });
        });
    },

    load: function() {

        $.get("/giantbomb/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })
    }

}