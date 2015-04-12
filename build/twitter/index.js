var TwitterData = {

   gamer: function(data) {

      $.get("/twitter/list.jade", function(template) {
          var html = jade.render(template, {
              data: data
          })
        $("#list").html(html);
      })
       
    },
    
    searchByName: function(name) {
        console.log("Making AJAX Call to /tweet_search (Replace with better way of referencing self)");
        $(document).ready(function(){    
            var test = $.ajax({
                url: "http://web-design-erikkierstead.c9.io/tweet_search", // our heroku address will go here until more clever way of referencing self is found ;) ;D
                type: "get",
                data: {
                    q: name
                },
                dataType: "json", //was jsonp
                success: function(data) { TwitterData.gamer(data) }, 
                error: function(){ console.log("Error in Ajax Call (oh noes!)"); }
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