// setup the starting list of topics
var topics = ["ribs", "burgers", "macaroni & cheese", "falafel", "tikka masala", "tacos", "spaghetti", "lo mein", "grilled cheese", "calzone"];
var queryURL = "";
var apiKey = "s8S9NQFl8QOkuSdFFCFtWbHbvDCFS1Ie";

//trigger creation of buttons for the user to select
function setButtons() {
    for (i=0; i<topics.length; i++) {
        var btn = $("<button>").attr({"class": "btn btn-success search", "data-topic": topics[i]});
        $(btn).text(topics[i]);
        $("#col-buttons").prepend(btn);
}}

//on topic button selection generate and append gifs in static condition
$("#col-buttons").on("click", "button", function() {
    $("#col-gifs").empty();
    // use the data attribute from the button to set the search tag
    var searchInput = $(this).data("topic");
    queryURL = "http://api.giphy.com/v1/gifs/random?tag=" + searchInput + "&api_key=" + apiKey;
    console.log(queryURL);
    // the "random endpoint" returns single results - loop through to achieve multiple responses
    for (i=0; i<1; i++) {
        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            // set the still and animate data attribute to be able to swap later
                var displayImg = $("<img>").attr({"class": "gif", "status": "still", "src": response.data.images.fixed_height_still.url, "data-still": response.data.images.fixed_height_still.url, "data-animate": response.data.images.fixed_height.url});
                $("#col-gifs").append(displayImg);
        });
    };
});

//on gif click - swap still/animate depending on current status
$("#col-gifs").on("click", ".gif", function() {
    if ($(this).attr("status") === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("status", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("status", "still");
    }
})

setButtons();