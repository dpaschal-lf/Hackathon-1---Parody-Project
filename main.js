var global_result;
var new_url;
var youtube_id_no;
var display_area;
var click_number = 0;



function build_query_string(search_info) {
       query_string_new = ("key=" + search_info["key"] + "&" + "q=" + search_info["q"] + "&" + "part=" + search_info["part"] + "&" + "maxResults=" + search_info["maxResults"]);
    return query_string_new;
}

function google_search(type, pill) {
    console.log(pill);
    var base_url = 'https://www.googleapis.com/youtube/v3/search?';
    if (pill == 0){
    var search_obj = {
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: "allintitle:'parody'" + " " + "+" + " " + "'" + type + "'",
        //q: "allintitle: 'spoof' + 'rebecca black'",
        part: 'snippet',
        maxResults: '6'
    }
}
    else {
        console.log("blue pill");
        var search_obj = {
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: "allintitle:" + "'" + type + "'",
        //q: "allintitle: 'spoof' + 'rebecca black'",
        part: 'snippet',
        maxResults: '6'
        }
    }
    var query_str = build_query_string(search_obj);
    console.log(query_str);
    new_url = base_url + query_str
    console.log(new_url);
    
}

// Video Display
    display_area = $("<div>", {
        class: "row",
        id: "video-area",
    });

     // Header
    var header_area = $("<div>", {
        class: "col-xs-12",
    });


    $('body').append(header_area);

    $(header_area).addClass('search-title');

    var title = "Follow the white rabbit.";
    $.each(title.split(""), function(i, letter){
       setTimeout(function(){
           $(header_area).html($(header_area).html() + letter);
       }, 200*i);
    });

    // Search Area
    var search_area = $("<div>", {
        class: "col-xs-12",
        id: "content-area",
    });

    var search_bar = $("<input>", {
        type: "search",
        class: "search_input col-xs-12",
        placeholder: "Enter Text Here",
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

    var footer = $("<div>", {
        text: "This is our footer",
    });

    $(footer_area).append(footer);
    $('body').append(footer_area);


function add_videos(){
    $('body').append(display_area); // adds the display area
    for (var i = 0; i < global_result.items.length; i++){ // for loop for every video we want to add to the screen
         //console.log(global_result.items[i].id.videoId); // shows video ID of each video
         youtube_id_no = global_result.items[i].id.videoId; // this is the unique video id from youTube
        var frame = $("<iframe>",{ //creates the iframe, sizes it, and then plays the link (src) with the video ID number
            class: "col-xs-12 col-sm-6 col-md-4",
            id: "ytplayer video-id" + i,
            type: "text/html",
            src: "https://www.youtube.com/v/" + youtube_id_no,
            //width: "640",
            //height: "390"
        });
        $(display_area).append(frame);
        //console.log("i", i);
    }
}
//$('body').append(display_area);
// Dynamic Layout

$(document).ready(function(){

   
    $("#red-pill").click(function(){ //upon clicking the red pill
        var which_pill = 0; //sets red pill to 0
        var enter_input = $(".search_input").val(); //finds user input in search screen
        google_search(enter_input, which_pill); //calls google_search function and passes user input and red pill (0)
        $.ajax({ //api call to ajax
            dataType: 'json',
            url: new_url, //url tht was created
            success: function(result){
                global_result = result;
                add_videos(); //calls add_videos function to put all of the video id's in a player


            }
        });       
    });
    $("#blue-pill").click(function(){ //upon clicking the blue pill
        var which_pill = 1; //sets blue pill to 1
        var enter_input = $(".search_input").val(); //finds user input in search screen
        google_search(enter_input, which_pill); //calls google_search function and passes user input and blue pill(1)
        $.ajax({ //api call to ajax
            dataType: 'json',
            url: new_url, //url that was created
            success: function(result){
                global_result = result;
                add_videos(); //calls add_videos function to put all of the video id's in a player
            } 
        });
});

});
