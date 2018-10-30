const API_KEY = "AIzaSyA23m5YJbOR0mNX2bpIXM5RxFEOgGgAYt0";

const URL_BASE = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&key=${API_KEY}`;

const CALLBACK = "&callback=?"

let videoId = "";

let videoShowYoutube = document.querySelector("#video-show-youtube");

document.querySelector("#submit").addEventListener("click", function(event) {
	let input = document.querySelector("#pokemon");
	let term = input.value;
	if (validaErroPokemon(input)) return;
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
	let iframeVideo = `
		<div className="embed-responsive embed-responsive-16by9">
			<iframe src={url} className="embed-responsive-item"></iframe>
		</div>
		<div className="details">
			<div>{video.snippet.title}</div>
			<div>{video.snippet.description}</div>
		</div>
	`;
	console.log(target.parentElement.id);
}