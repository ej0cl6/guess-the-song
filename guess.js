var play_sec = 30;
var wait_sec = 10;
var playlist = links.map(get_v);

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: playlist[0],
		events: {
			'onReady': onPlayerReady,
			'onStateChange': onPlayerStateChange
		}
	});
}

function onPlayerReady(event) {
	playlist = shuffle(playlist);
	player.loadPlaylist(playlist);
}

function onPlayerStateChange(event){
	if (event.data == YT.PlayerState.PLAYING) {
		document.getElementById("player").style.visibility = 'hidden';
		set_countdown(play_sec);
		setTimeout(show_title, play_sec*1000+50);
	}
}

function show_title(){
	document.getElementById("player").style.visibility = 'visible';
	document.getElementById("title").innerText = player.getVideoData().title;
	setTimeout(play_next, wait_sec*1000);
}

function play_next(){
	document.getElementById("player").style.visibility = 'hidden';
	player.nextVideo();
}

function set_countdown(sec){
	document.getElementById("title").innerText = sec;
	if(sec > 1)
		setTimeout(set_countdown, 1*1000, sec-1);
}

function preprocess(){
	document.getElementById("url").value = links.join("\n");
	document.getElementById("qtime").value = play_sec;
	document.getElementById("atime").value = wait_sec;
}

function start(){
	apply();
	player.playVideo();
}

function apply(){
	play_sec = parseInt(document.getElementById("qtime").value);
	wait_sec = parseInt(document.getElementById("atime").value);
}

function swtich_hidden(){
	if(document.getElementById("player").style.visibility == 'visible')
		document.getElementById("player").style.visibility = 'hidden';
	else
		document.getElementById("player").style.visibility = 'visible';
}

function get_v(url){
	url = url.trim();
	var hashes = url.slice(url.indexOf('?')+1).split('&');
	for(var i=0; i< hashes.length; i++){
		if(hashes[i].startsWith('v='))
			return hashes[i].split('=')[1];
	}
}

function clear_timeout(){
	var highestTimeoutId = setTimeout(";");
	for(var i=0 ; i<highestTimeoutId ; i++) {
		clearTimeout(i); 
	}
}

function load_links(){
	var code_list = document.getElementById('url').value;
	var playlist = code_list.split('\n');
	playlist = playlist.map(get_v);
	playlist = shuffle(playlist);
	clear_timeout();
	document.getElementById("player").style.visibility = 'hidden';
	player.loadPlaylist(playlist);
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex ;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


