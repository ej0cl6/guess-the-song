var playlist = links.map(get_v);
playlist = playlist.filter(p => p != "Invalid");
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var player;
var run_flag = 1;
var show_flag = 0;

window.addEventListener('keydown', function (e) {
	if(event.keyCode == 83){
		if(run_flag)
			player.pauseVideo();
		else
			player.playVideo();
		run_flag = 1 - run_flag;
	}
	else if(event.keyCode == 78){
		if(show_flag)
			play_next();
		else
			show_title();
		show_flag = 1 - show_flag;
	}
}, false);

function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: playlist[0],
		events: {
			'onReady': onPlayerReady
		}
	});
}

function onPlayerReady(event) {
	playlist = shuffle(playlist);
	player.loadPlaylist(playlist);
	set_timer(1);
}

function show_title(){
	clear_timer();
	document.getElementById("player").style.visibility = 'visible';
	document.getElementById("title").innerText = player.getVideoData().title;
}

function play_next(){
	document.getElementById("player").style.visibility = 'hidden';
	player.nextVideo();
	set_timer(1);
}

function preprocess(){
	document.getElementById("url").value = links.join("\n");
}

function set_timer(sec){
	document.getElementById("title").innerText = sec;
	setTimeout(set_timer, 1*1000, sec+1);
}

function clear_timer(){
	var highestTimeoutId = setTimeout(";");
	for(var i=highestTimeoutId-1; i>=0 ; i--) {
		clearTimeout(i); 
	}
}

function start(){
	player.playVideo();
	set_timer(1);
}

function swtich_hidden(){
	if(document.getElementById("player").style.visibility == 'visible')
		document.getElementById("player").style.visibility = 'hidden';
	else
		document.getElementById("player").style.visibility = 'visible';
}

function get_v(url){
	url = url.trim();
	if(url.includes("www.youtube.com")){
		var hashes = url.slice(url.indexOf('?')+1).split('&');
		for(var i=0; i< hashes.length; i++){
			if(hashes[i].startsWith('v='))
				return hashes[i].split('=')[1];
		}
	}
	else if(url.includes("youtu.be")){
		elements = url.split("/");
		return elements[elements.length-1];
	}
	return "Invalid";
}

function load_links(){
	var code_list = document.getElementById('url').value;
	var playlist = code_list.split('\n');
	playlist = playlist.map(get_v);
	playlist = playlist.filter(p => p != "Invalid");
	playlist = shuffle(playlist);
	clear_timer();
	document.getElementById("player").style.visibility = 'hidden';
	player.loadPlaylist(playlist);
}

function shuffle(array) {
	var currentIndex = array.length;
	var temporaryValue, randomIndex ;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}
	return array;
}


