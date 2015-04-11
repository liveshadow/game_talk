$( "#giantbomb" ).on( "click", function( event ) {
    $("#ui").html("")
    $("#list").html("")
    GameData.load()
})

$( "#twitter" ).on( "click", function( event ) {
    $("#ui").html("")
    $("#list").html("")
    TwitterData.load()
})