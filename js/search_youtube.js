const API_KEY = "AIzaSyA23m5YJbOR0mNX2bpIXM5RxFEOgGgAYt0";

const URL_BASE = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&type=video&key=${API_KEY}`;

const CALLBACK = "&callback=?"

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
			let lis = `
				<li id=${item.id.videoId} class="videos-pokemon" onClick="showVideo(event.target.parentElement)">
					<h2 class="video-title">${item.snippet.title}</h2>

					<img src=${item.snippet.thumbnails.default.url} alt=${item.snippet.title} />
					<p class="video-description">${item.snippet.description}</p>
				</li>
			`;
			listVideos.insertAdjacentHTML('beforeend', lis);
		});
		let li = document.querySelector("#list-videos").getElementsByTagName("li")[0];
		showVideo(li);
	});
});


function showVideo(li){
	let title = li.querySelector(".video-title").textContent;
	let description = li.querySelector(".video-description").textContent;
	const videoId = li.id;
	const url = `https://www.youtube.com/embed/${videoId}`;
	let videoShowYoutube = document.querySelector("#video-show-youtube");
	let iframeVideo = `
		<div className="embed-responsive">
			<iframe src=${url} className="embed-responsive-item"></iframe>
		</div>
		<div className="details">
			<h2>${title}</h2>
			<p>${description}</p>
		</div>
	`;
	videoShowYoutube.innerHTML = iframeVideo;
}