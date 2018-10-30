const API_KEY = "AIzaSyA23m5YJbOR0mNX2bpIXM5RxFEOgGgAYt0";

const URL_BASE = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&key=${API_KEY}`;

const CALLBACK = "&callback=?"

let videoId = "";

document.querySelector("#submit").addEventListener("click", function(event) {
	let term = document.querySelector("#pokemon").value;
	let URL = `${URL_BASE}&q=${term}`;
	document.querySelector("#list-videos").innerHTML = "";
	let listVideos = document.querySelector("#list-videos");
	$.getJSON(URL, function(data){
		data.items.forEach(item => {
			var element = `
				<li id=${item.id.videoId} class="videos-pokemon" onClick="showVideo(event.target)">
					<h2>${item.snippet.title}</h2>

					<img src=${item.snippet.thumbnails.default.url} alt=${item.snippet.title} />
					<p>${item.snippet.description}</p>
				</li>
			`;
			listVideos.insertAdjacentHTML('beforeend', element);
		});
	});
});

function showVideo(target){
	console.log(target.parentElement.id);
}