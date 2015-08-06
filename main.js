var global_result;
var new_url;
var youtube_id_no;


function build_query_string(search_info) {
       query_string_new = ("key=" + search_info["key"] + "&" + "q=" + search_info["q"] + "&" + "part=" + search_info["part"] + "&" + "maxResults=" + search_info["maxResults"]);
    return query_string_new;
}

function google_search(type) {
    console.log("Yes");
    var base_url = 'https://www.googleapis.com/youtube/v3/search?';
    var search_obj = {
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: "allintitle:'parody'" + " " + "+" + " " + "'" + type + "'",
        //q: "allintitle: 'spoof' + 'rebecca black'",
        part: 'snippet',
        maxResults: '6'
    }
    var query_str = build_query_string(search_obj);
    console.log(query_str);
    new_url = base_url + query_str
    console.log(new_url);
    // var script_search = $('<script>', {
    //     src: base_url + query_str
    // });
    // $('body').append(script_search);
};


// Dynamic Layout

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

    // Video Display
    var display_area = $("<div>", {
        class: "row",
        id: "video-area",
    });

    function add_videos(){
        for (var i = 0; global_result.items.length; i++){
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
        var enter_input = $(".search_input").val();
        console.log(enter_input);
        google_search(enter_input);
        $.ajax({
            dataType: 'json',
            url: new_url,
            success: function(result){
                //console.log('loaded',result);
                global_result = result;
                //console.log('my videoId' , global_result.items[0].id.videoId);
                //console.log(global_result.items.length);
                add_videos();


            }
        });       
    });
});
