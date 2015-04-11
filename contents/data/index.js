var data = {

//NOTE: original code references sunlight homework assignment UCDD Spring 2015
    searchByZipcode: function(zipcode) {

        // search legistalors by zipcode (default to Boulder, 80301)
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        var name = "metroid"

        $.get("http://www.giantbomb.com/api/search?api_key="+apikey.apikey_bomb+"&format=json&query="+ name +"&resources=game", function(data) {

            console.log('got ' + data)
            if (data.results){

                $.get("/data/list.jade", function(template) {
                    var html = jade.render(template, {
                        data: data
                    })
                    console.log(html)
                    $("#list").html(html)
                })

            }

        })

    },

    searchByName: function(name) {

        // search legistalors by name
        // ref: https://sunlightlabs.github.io/congress/legislators.html

        $.get("https://congress.api.sunlightfoundation.com/legislators?query=" + name, apikey, function(data) {

            $.get("/data/list.jade", function(template) {
                var html = jade.render(template, {
                    data: data
                })
                $("#list").html(html)
            })

        })

    },

    load: function() {

        $.get("/data/ui.jade", function(template) {
            var html = jade.render(template)
            $("#ui").html(html)
        })

        // default search results
        data.searchByZipcode('80303')

    }

}