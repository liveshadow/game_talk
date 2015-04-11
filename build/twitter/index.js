var TwitterData = {

//NOTE: original code references sunlight homework assignment UCDD Spring 2015
    searchByZipcode: function(zipcode) {

        // search legistalors by zipcode (default to Boulder, 80301)
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        var name = "metroid"

        $.get("http://www.giantbomb.com/api/search?api_key="+apikey.apikey_bomb+"&format=json&query="+ name +"&resources=game", function(data) {

            console.log('got ' + data)
            if (data.results){

                $.get("/giantbomb/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: data
                    })
                    console.log(html)
                    $("#list").html(html)
                })

            }

        })

    },

   gamer: function(data) {

        var top_tweets = [];

        console.log("BEGIN");
        var client = app.get(app.data.client);
        //This is the call to Twitter's RESTful API, Add Error Detection::
        client.get('search/tweets', {q: 'metroid'}, function(error, tweets, response){
            console.log("I'M IN YO");
           
            for (index in tweets['statuses']) {
            
                top_tweets.push({
                    user_name: tweets['statuses'][index]['user'].screen_name,
                    date: tweets['statuses'][index].created_at,
                    text: tweets['statuses'][index].text
                });
            }

            console.log(top_tweets);
        });

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
                data: {api_key : apikey.apikey_bomb, query: name, format: "jsonp", resources: "game", json_callback: "TwitterData.gamer"},
                dataType: "jsonp"
            });
        
        });
    },

    load: function() {

        $.get("/twitter/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })
    }

}