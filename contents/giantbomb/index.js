var GameData = {

    details: function(tweetData, revList, genData) {
        console.log(genData)
        console.log(revList)
        console.log(tweetData)
        $.get("/giantbomb/details.jade", function(template) {
            var html = jade.render(template, {
                gen: genData,
                rev: revList,
                data: tweetData
            })
            $("#list").html(html);
        })
    },

    tweets: function(revData, genData, game_name) {
        var revList = []
        console.log(revData)
        if (revData.results)
        {
            for (var i = 0; i < revData.results.length; i++)
            {   
                console.log(revData.results[i].name +" && "+ game_name)
                if (revDat.results[i].name == game_name)
                {
                    revList.push(revDat.results[i])
                }
            }
        }
        $(document).ready(function(){    
            var test = $.ajax({
                url: "http://localhost:8000/tweet_search", // our heroku address will go here until more clever way of referencing self is found ;) ;D
                type: "get",
                data: {
                    q: game_name
                },
                dataType: "json", //was jsonp
                success: function(data) { GameData.details(data,revList, genData) }, 
                error: function(){ console.log("Error in Ajax Call (oh noes!)"); }
            });
        });
    },

    gameReview: function(genData, game_name) {
        $(document).ready(function(){    
            $.ajax({
                url: "http://api.giantbomb.com/search/?json_callback=?",
                type: "get",
                data: {api_key : apikey.apikey_bomb, query: game_name, format: "jsonp", resources: "review"},
                dataType: "jsonp",
                success: function(data){
                    GameData.tweets(data, genData.results, game_name);
                }
            });
        });
    },

    gameDetails: function(game_id, game_name) {
        $(document).ready(function(){    
                $.ajax({
                    url: "http://api.giantbomb.com/game/"+game_id+"/?json_callback=?",
                    type: "get",
                    data: {api_key : apikey.apikey_bomb, format: "jsonp"},
                    dataType: "jsonp",
                    success: function(data){
                        GameData.gameReview(data, game_name);
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

    load: function() {

        $.get("/giantbomb/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })
    }

}