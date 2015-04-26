var express = require("express");

//Creating Web Server 
var http = require('https');
var path = require('path');

//Creating the Web Server:
var app = express();
var server = http.createServer(app);


//Alchemy API Shenanigans:
var consolidate = require('consolidate');
var AlchemyAPI = require('./alchemyapi');
var alchemyapi = new AlchemyAPI();


//Twitter Module:
var Twitter = require('twitter');

//Will Regenerate New API Keys:
var client = new Twitter({
    consumer_key: 'HUd2dbIQJNF0E29QeTvP4ZOST',
    consumer_secret: 'VW8DDSz7AoF2zKAAGxuDgN4gMeAGMZZptyGr3OjYRDTl7gm4mf',
    access_token_key: '931174363-IkBnF7yUBODRoLu82jxio8iQnKCDbKJZEh6OBYpT',
    access_token_secret: 'JTW6LS7zKs3sq8Li2eEmFgCV4PeFuc037Xpis0lkHtwZo'
});

app.use(express.static(__dirname + "/build"));

//Available for Ajax call on front end, then conducts Twitter RESTful API Call
//which then uses AlchemyAPI for Sentiment Analysis and Returns JSON:
app.get('/tweet_search', function(req, res){
 
    var query = req.query['q'] || "";
   
    client.get('search/tweets', {q: query, count:50}, function(error, tweets, response){
   
        if(error) {
            //return an object with statuses with blank / error values:
        }
         
         //Successful Call to Twitter:
        else { 
             
             //Combines Text from All Tweets, Uses AlchemyAPI for Sentiment Analysis and Returns Pos/Neg:
            var tweet_text= "";
            for(index in tweets['statuses']){ tweet_text += tweets["statuses"][index].text + " ";}

            tweets["sentiment"] = "None";
        
            alchemyapi.sentiment("text", tweet_text, {}, function(response) {
                
                if(response.hasOwnProperty("sentiment")) { 
                    if(response["sentiment"].hasOwnProperty("type")) {
                        tweets["sentiment"] = response["docSentiment"]["type"];
                    }
                }
                   
                    res.send(tweets);
            });
        
             
             //Fix scoping issue with tweets['sentiment'] not being permanent in alchemyapi method
             //res.send(tweets) 
        }
    });
});

app.listen(process.env.PORT || 8000);