const API_KEY = "AIzaSyA23m5YJbOR0mNX2bpIXM5RxFEOgGgAYt0";

const URL_BASE = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API_KEY}`;

const CALLBACK = "&callback=?"

let videoId = "";

document.querySelector("#submit").addEventListener("click", function(event) {
	let term = document.querySelector("#pokemon").value;
	let URL = `${URL_BASE}&q=${term}`;
	let listVideos = document.querySelector("#list-videos");
	$.getJSON(URL, function(data){
		data.items.forEach(item => {
			var element = `
				<li id=${item.id.videoId} class="videos-pokemon">
					<h2>${item.snippet.title}</h2>

					<img src=${item.snippet.thumbnails.default.url} alt=${item.snippet.title} />
					<p>${item.snippet.description}</p>
				</li>
			`;
			listVideos.insertAdjacentHTML('beforeend', element);
		});
	});
});

let videoPlaying = document.querySelector("#video-playing");
//let URL_VIDEO = `https://www.youtube.com/embed/${videoId}`;

$(".videos-pokemon").click(function(event){
	console.log("teste: " + event.target.id);
});


document.getElementById("parent-list").addEventListener("click",function(e) {
        // e.target is our targetted element.
                    // try doing console.log(e.target.nodeName), it will result LI
        if(e.target && e.target.nodeName == "LI") {
            console.log(e.target.id + " was clicked");
        }
    });