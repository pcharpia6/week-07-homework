var topics = ["ribs", "burgers", "macaroni & cheese", "falafel", "tikka masala", "tacos", "spaghetti", "lo mein", "grilled cheese", "calzone"];
var queryURL = "";
var apiKey = "s8S9NQFl8QOkuSdFFCFtWbHbvDCFS1Ie";

function setButtons() {
    console.log("setbuttons");
    for (i=0; i<topics.length; i++) {
        console.log(i);
        var btn = $("<button>").attr({"class": "btn btn-success", "data-topic": topics[i]});
        $(btn).text(topics[i]);
        $("#main").prepend(btn);
}}

function apiSearch() {
    var responseDiv = $("<div>").attr("class", "gif");
    

    var searchInput = $this.attr("data-topic");
    queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchInput + "&api_key=" + apiKey + "&limit=3";
}

$(".search").on("click", apiSearch);

setButtons();