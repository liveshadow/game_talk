var GameData = {

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