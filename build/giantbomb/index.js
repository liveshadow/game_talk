var GameData = {

   details: function(data) {
        for (var i = 0; i < data.results.genres.length; i++)
        {
            console.log(data.results.genres[i].name)
        }
        $.get("/giantbomb/details.jade", function(template) {
            var html = jade.render(template, {
                data: data.results
            })
            $("#list").html(html);
        })
   },

   gameDetails: function(game_id) {
        console.log(game_id)
        $(document).ready(function(){    
                $.ajax({
                    url: "http://api.giantbomb.com/game/"+game_id+"/",
                    type: "get",
                    data: {api_key : apikey.apikey_bomb, format: "jsonp", json_callback: "GameData.details"},
                    dataType: "jsonp"
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
                url: "http://api.giantbomb.com/search/",
                type: "get",
                data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game", json_callback: "GameData.gamer"},
                dataType: "jsonp"
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