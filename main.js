var global_result;
var new_url;


$("#search").click(function(){
     google_search("");
     $.ajax({
			dataType: 'json',
			url: new_url,
			success: function(result){
				//console.log('loaded',result);
				global_result = result;

                
                console.log(global_result.items[5].id.videoId);
                console.log(global_result);
			}
	});       
});


function build_query_string(search_info) {
       query_string_new = ("key=" + search_info["key"] + "&" + "q=" + search_info["q"] + "&" + "part=" + search_info["part"] + "&" + "maxResults=" + search_info["maxResults"]);
    return query_string_new;
}

function google_search(type) {
    console.log("Yes");
    var base_url = 'https://www.googleapis.com/youtube/v3/search?';
    var search_obj = {
        key: 'AIzaSyC3I7ZOg87Kl7GFmiQf_n_aKrzYfbc0puo',
        q: type + 'spoof',
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