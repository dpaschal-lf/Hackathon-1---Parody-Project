var global_result;
var new_url;
var youtube_id_no;
var display_area;



function build_query_string(search_info) { //builds the string that will be sent to ajax using info from function google_search
       query_string_new = ("key=" + search_info["key"] + "&" + "q=" + search_info["q"] + "&" + "part=" + search_info["part"] + "&" + "maxResults=" + search_info["maxResults"]);
    return query_string_new;
}

function google_search(type, pill) { //type is user's input, pill is which pill was clicked
    var base_url = 'https://www.googleapis.com/youtube/v3/search?'; //base url is the first part to send
    if (pill == 0){ //if pill clicked was the red pill
    var search_obj = { //object uses api key, search parameters (q), part (required), and how many results
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: "allintitle:'parody'" + " " + "+" + " " + "'" + type + "'",
        part: 'snippet',
        maxResults: '6'
    }
}
    else { //if pill clicked was the blue pill
        var search_obj = { //object uses api key, search parameters (q), part (required), and how many results
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: "allintitle:" + "'" + type + "'",
        part: 'snippet',
        maxResults: '6'
        }
    }
    var query_str = build_query_string(search_obj); //query_str is the second part of the url we need to send
    new_url = base_url + query_str //new_url is the base url from first line of function google_search plus the second part we created from user input
    console.log(new_url);
    
}

// Video Display
    display_area = $("<div>", {
        class: "row",
        id: "video-area",
    });

     // Header
    var header_area = $("<div>", {
        class: "col-xs-10",
        id: "header-area",
    });

    $('body').append(header_area);
    $(header_area).addClass('search-title');

    var title = "Follow the white rabbit.";
    $.each(title.split(""), function(i, letter){
       setTimeout(function(){
           $(header_area).html($(header_area).html() + letter);
       }, 300*i);
    });

    // Search Area
    var search_area = $("<div>", {
        class: "col-xs-8",
        id: "search-area",
    });

    var search_bar = $("<input>", {
        type: "search",
        class: "search_input col-xs-12",
    });

    $(search_area).append(search_bar);
    $('body').append(search_area);

    // Buttons
    var red_button = $("<button>", {
        type: "button",
        class: "red-button glyphicon glyphicon-eye-open",
        id:"red-pill",
    });

    var blue_button = $("<button>", {
        type: "button",
        class: "blue-button glyphicon glyphicon-eye-close",
        id:"blue-pill"
    });

    $(search_area).append(red_button, blue_button);

    // Footer
    var footer_area = $("<div>", {
        class: "col-xs-12"
    });

    function add_videos(){

        for (var i = 0; global_result.items.length; i++){ //uses the maxResults to determine how many times the loop runs
             //console.log(global_result.items[i].id.videoId);
            youtube_id_no = global_result.items[i].id.videoId; //finds the specific video id from YouTube
            var frame = $("<iframe>",{ //makes an iframe
                class: "col-xs-12 col-sm-6 col-md-4",
                id: "ytplayer video-id" + i,
                type: "text/html",
                src: "https://www.youtube.com/v/" + youtube_id_no, //src is the full youtube link to embed
            });
            $(display_area).append(frame); //appends the new iframe into the display_area
        }
    }
    
    $('body').append(display_area); //appends display_area to the body

    // Footer
    var footer_area = $("<div>", {
        class: "col-xs-12",
        id: "footer-area",
    });

    var footer = $("<div>", {
        html: "Developed & Designed By:<br> <a href=''>Nichole Culp</a>, <a href=''>Cher Huang</a>, <a href=''>Darin Jacobson</a>, <a href=''>Alex Mattingley</a>",
        class: "footer-text",
    });

    $(footer_area).append(footer);
    $('body').append(footer_area);


$(document).ready(function(){

    $("#red-pill").click(function(){ //this happens if the red button was clicked
        var which_pill = 0; //gives red button a var
        var enter_input = $(".search_input").val(); //finds user's search input
        //console.log(enter_input);
        google_search(enter_input, which_pill); //sends user's input and which pill was clicked to google_search function
        $.ajax({ //ajax call
            dataType: 'json',
            url: new_url, //uses url we created for api
            success: function(result){
                global_result = result;
                add_videos(); //calls function add_videos to use information obtained from api call


            }
        });       
    });
    $("#blue-pill").click(function(){ //this happens if the blue button was clicked
        var which_pill = 1; //gives blue button a var
        var enter_input = $(".search_input").val(); //finds user's search input
        //console.log(enter_input);
        google_search(enter_input, which_pill); //sends user's input and which pill was clicked to google_search function
        $.ajax({ //ajax call
            dataType: 'json',
            url: new_url, //uses url we created for api
            success: function(result){
                global_result = result;
                add_videos(); //calls function add_videos to use information obtained from api call
            }
        });
    });
});
