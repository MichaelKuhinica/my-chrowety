$('embed').attr('wmode', 'transparent');
var _time = _NAME_;
var _total = _TOTAL_;
var _Alerts = _Alerts_;
var _Max = _MAX_;
chrome.extension.sendRequest({'novos_tweets': true, 'tm': _time, 'total': _total, 'max': _Max}, function(response) {
    if(!document.getElementById('Chrowety')){
        var divCentral =
        '<div id="Chrowety" class="Chrowety dn">' +
            '<span class="alerts fl" title="Chrowety '+_Alerts+'"><img src="'+chrome.extension.getURL('icones/x16.png')+'">'+_Alerts+'</span>'+
            '<span id="Chrowety_close" class="close fr">X</span>' +
            '<br />' +
            '<div id="Chrowety_tws">' +
                response.tweets +
            '</div>' +
        '</div>';

        $(document.body).prepend(divCentral);

        $('#Chrowety_close').bind('click', function(){
            $('#Chrowety').remove();
        });

        $('#Chrowety').animate({opacity: 1.0}, 5000);
        window.ChrowetyTime = window.setTimeout(function(){
            $('#Chrowety').animate({opacity: 0.0}, 5000, function(){$('#Chrowety').remove();window.clearTimeout(window.ChrowetyTime);});
        }, 2000);

        $('#Chrowety').bind('mouseover', function(e){
            $('#Chrowety').stop(true, false);
            window.clearTimeout(window.ChrowetyTime);
            $('#Chrowety').animate({opacity: 1.0}, 100);
        });

        $('#Chrowety').bind('mouseout', function(e){
            $('#Chrowety').stop(true, false);
            window.ChrowetyTime = window.setTimeout(function(){
                $('#Chrowety').animate({opacity: 0.0}, 5000, function(){$('#Chrowety').remove();window.clearTimeout(window.ChrowetyTime);});
            }, 2000);
        });
    }else{
        $('#Chrowety_tws').prepend(response.tweets);
    }
    $('.Chrowety .rt').css({'background-image': 'url('+chrome.extension.getURL('img/sprite-icons.png')+')'});
    $('.Chrowety .rts').css({'background-image': 'url('+chrome.extension.getURL('img/sprite-icons.png')+')'});
    /*
    $('.Chrowety .twet, .Chrowety .reply').css({'background': '#ffffff url(chrome-extension://'+exID+'/img/w.jpg) no-repeat left bottom'});
    $('.Chrowety .r').css({'background': 'transparent url('+chrome.extension.getURL('img/r.png')+') no-repeat'});
    $('.Chrowety .cadeado').css({'background-image': 'url('+chrome.extension.getURL('img/sprite-icons.png')+')'});
    $('.Chrowety .lixo').css({'background-image': 'url('+chrome.extension.getURL('img/sprite-icons.png')+')'});
    $('.Chrowety .star').css({'background-image': 'url('+chrome.extension.getURL('img/sprite-icons.png')+')'});
    */

});