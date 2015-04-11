var TwitterData = {

   gamer: function(error, tweets, response) {

        var top_tweets = [];
        //This is the call to Twitter's RESTful API, Add Error Detection::
           
        for (index in tweets['statuses']) {
        
            top_tweets.push({
                user_name: tweets['statuses'][index]['user'].screen_name,
                date: tweets['statuses'][index].created_at,
                text: tweets['statuses'][index].text
            });
        }

        console.log(top_tweets);
    
        // $.get("/twitter/list.jade", function(template) {
        //     var html = jade.render(template, {
        //         data: data
        //     })
        //     $("#list").html(html);
        // })
    },
    
    searchByName: function(name) {

        $(document).ready(function(){    
            $.ajax({
                url: "http://api.twitter.com/search/tweets",
                type: "get",
                data: {
                    consumer_key: 'HUd2dbIQJNF0E29QeTvP4ZOST',
                    consumer_secret: 'VW8DDSz7AoF2zKAAGxuDgN4gMeAGMZZptyGr3OjYRDTl7gm4mf',
                    access_token_key: '931174363-IkBnF7yUBODRoLu82jxio8iQnKCDbKJZEh6OBYpT',
                    access_token_secret: 'JTW6LS7zKs3sq8Li2eEmFgCV4PeFuc037Xpis0lkHtwZo', 
                    q: 'metroid',
                    json_callback: "TwitterData.gamer"
                },
                dataType: "jsonp",
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