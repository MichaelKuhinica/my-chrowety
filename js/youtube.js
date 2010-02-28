if(location.search){
    var ID = (/[\?&]v\=(.{11})/g).exec(location.search)[1]; //search
}else{
    var ID = (/v\=(.{11})/g).exec(location.hash)[1]; //hash
}
var D = document;
var box = D.createElement('div');
var map = D.createElement('div');
var img = D.createElement('img');
var msg = D.createElement('div');
var tra;

box.id = 'chrowety-box';
map.id = 'chrowety-map';
img.id = 'chrowety-img';
msg.id = 'chrowety-msg';

img.src = chrome.extension.getURL('icones/x32.png');

chrome.extension.sendRequest({
    traduz: true,
    texto: ['share_this_video', 'sharing', 'shared', 'error', 'try_again', 'please_login']
}, function(response){
    tra = response.traduzido;
    if (response.logado) {
        msg.innerHTML = map.title = tra[0]; // Share this video...
        map.addEventListener('click', shareVideo);
    }
    else {
        msg.innerHTML = map.title = tra[5]; // Please Login...
    }
});

var lock;
function shareVideo(e){
    if (lock) {
        return;
    }
    lock = true;
    msg.innerHTML = tra[1]; // Sharing...
    chrome.extension.sendRequest({
        shareVideo: true,
        videoTitle: document.getElementsByTagName('h1')[0].innerText,
        videoID: ID
    }, function(response){
        if (response.enviou) {
            msg.innerHTML = '<span class="green">' + tra[2] + '!</span>'; // Shared...
            map.title = tra[2];
            map.removeEventListener('click', shareVideo);
            map.style.cursor = 'default';
        }
        else {
            msg.innerHTML = '<span class="red">' + tra[3] + ', ' + tra[4] + '.</span>'; // Error...
            map.title = tra[3] + ', ' + tra[4];
        }
        lock = null;
    });
}

function Watch5(){
    if(D.getElementById('watch-info')){
        map.style.float = 'left';
        box.style.display = 'inline';
        msg.style.display = 'inline';
        var blank = D.createElement('br');
        blank.style.clear = 'both';
        box.appendChild(blank);
        D.getElementById('watch-info').insertBefore(box);
        var ls = D.getElementsByClassName('video-list-item-link');
        for(var i in ls){
            if(ls[i] && ls[i].href){
                ls[i].href = ls[i].href.replace('#v', '?v'); //Tira ajax dos links
                //ls[i].addEventListener('click', Watch5);
            }
        }
    }else{
      setTimeout("Watch5()", 500);
    }
}

map.appendChild(img);
map.appendChild(msg);
box.appendChild(map);

var par = D.getElementById('watch-channel-vids-div');
var impar = D.getElementById('vd');
if(par){ // Youtube Default Mode
    par.appendChild(box);
}
else if(impar){ // Youtube Feather Mode
	map.style.border = 'none';
    box.style.marginTop = '15px';
    impar.appendChild(box);
}
else{ //Youtube Watch5 Mode
    Watch5();
}