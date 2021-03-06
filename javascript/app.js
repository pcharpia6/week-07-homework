// setup the starting list of topics
var topics = ["ribs", "burgers", "macaroni and cheese", "falafel", "tikka masala", "tacos", "spaghetti", "lo mein", "grilled cheese", "calzone"];
var queryURL = "";
var apiKey = "s8S9NQFl8QOkuSdFFCFtWbHbvDCFS1Ie";

// trigger creation of buttons for the user to select
function setButtons() {
    $("#col-buttons").empty();
    for (i=0; i<topics.length; i++) {
        var btn = $("<button>").attr({"class": "btn btn-success search", "data-topic": topics[i]});
        $(btn).text(topics[i]);
        $("#col-buttons").prepend(btn);
}}

// on topic button selection generate and append gifs in static condition
$("#col-buttons").on("click", "button", function() {
    $("#col-gifs").empty();
    // use the data attribute from the button to set the search tag
    var searchInput = $(this).data("topic");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchInput + "&api_key=" + apiKey + "&limit=50";
    console.log(queryURL);
    // the "random endpoint" returns single results - loop through to achieve multiple responses
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        // set the still and animate data attribute to be able to swap later
        for (i=0; i<10; i++) {
            var pickImg = Math.floor((Math.random() * 50) + 0)
            var displayImg = $("<img>").attr({"class": "gif", "status": "still", "src": response.data[pickImg].images.fixed_height_still.url, "data-still": response.data[pickImg].images.fixed_height_still.url, "data-animate": response.data[pickImg].images.fixed_height.url});
            var displayRat = $("<h3>").attr("class", "rating").text("Rating: " + response.data[pickImg].rating);
            var displaySpan = $("<span>").attr("id", "display");
            $("#display").append(displayImg, displayRat)
            $("#col-gifs").append(displaySpan);
        }
    });
});

// on gif click - swap still/animate depending on current status
$("#col-gifs").on("click", ".gif", function() {
    if ($(this).attr("status") === "still") {
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("status", "animate");
    } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("status", "still");
    }
})

// add a topic button via the form
$("#add").on("click", function() {
    var addButton = $("#addVal").val().trim();
    // exclude whitespace entries
    if (addButton) {
        topics.push(addButton);
        setButtons();
    }
})

setButtons();