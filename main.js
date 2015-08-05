// Dynamic Layout

$(document).ready(function(){

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

    // Video Display
    var display_area = $("<div>", {
        class: "row",
        id: "video-area",
    });



    for (var i = 0; i<= 5; i++){
        var frame = $("<iframe>",{
            class: "col-xs-12 col-sm-6 col-md-4",
            id: "ytplayer video-id" + i,
            type: "text/html",
            src: "https://www.youtube.com/v/B9vPoCOP7oY",
        });
        $(display_area).append(frame);
        console.log("i", i);
    }
    
    $('body').append(display_area);

    // Footer
    var footer_area = $("<div>", {
        class: "col-xs-12"
    });

    var footer = $("<div>", {
        text: "This is our footer",
    });

    $(footer_area).append(footer);
    $('body').append(footer_area);
});
