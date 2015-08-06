var global_result;
var new_url;
var youtube_id_no;
var display_area;



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
        class: "col-xs-10 col-xs-offset-1",
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

    var instruction_area = $("<div>", {
        class: "col-xs-10 col-xs-offset-1",
        id: "instruction-area",
    });

    $('body').append(instruction_area);
    $(header_area).addClass('search-title');

    var welcome = "Instructions: You click the blue pill, the story ends. You wake up and see what you want to see. You click the red pill, you stay in YouTube land, and I show you how deep the rabbit hole goes. ";
    $.each(welcome.split(""), function(i, letter){
        setTimeout(function(){
            $(instruction_area).html($(instruction_area).html() + letter);
        }, 100*i);
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
        for (var i = 0; i < global_result.items.length; i++){
             console.log(global_result.items[i].id.videoId);
             youtube_id_no = global_result.items[i].id.videoId;
            var frame = $("<iframe>",{
                class: "col-xs-12 col-sm-6 col-md-4",
                id: "ytplayer video-id" + i,
                type: "text/html",
                src: "https://www.youtube.com/v/" + youtube_id_no,
            });
            $(display_area).append(frame);
            //console.log("i", i);
        }
    }
    
    $('body').append(display_area);

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

    $("#red-pill").click(function(){
        var which_pill = 0;
        var enter_input = $(".search_input").val();
        console.log(enter_input);
        google_search(enter_input, which_pill);
        $.ajax({
            dataType: 'json',
            url: new_url,
            success: function(result){
                global_result = result;
                add_videos();


            }
        });       
    });
    $("#blue-pill").click(function(){
        var which_pill = 1;
        var enter_input = $(".search_input").val();
        console.log(enter_input);
        google_search(enter_input, which_pill);
        $.ajax({
            dataType: 'json',
            url: new_url,
            success: function(result){
                global_result = result;
                add_videos();
            }
        });
    });
});
