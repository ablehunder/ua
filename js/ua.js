var themes = {
    'elegant'   : 'Elegant',
    'clean'     : 'Clean',
    'dark'      : 'Dark Mode',
    // 'fancy'     : 'Fancy',
    'pink'      : 'Pinky'
};

var songs = [
    '2meKbkpUpbg.mp3',
    '5WGTCsk3KC4.mp3',
    'brDjam33BfE.mp3',
    'bSv4yesuaMQ.mp3',
    'f4crKVutaS0.mp3',
    'u3IydjQzJIg.mp3',
    'VWEWJDJcA_A.mp3',
    'W4toJlqM_50.mp3',
    'YW1k9qhcUEI.mp3'
];

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$(document).ready(function(){

    // document.title= 'Comment this on production';

    var params=getUrlVars()

    var nama = (params && params['to'])? decodeURI(params['to']) : '';
    // console.info(params, nama);
    $('#namaundangan').text(nama);
    if (!nama || (nama && (nama.length==0))) $('#labelundangan').hide();

    $('#openSetting, #closeSetting').click(function(e){
        e.preventDefault();
        $('#floatSetting, #fullpage').toggle();
    });

    $(document).on('keydown', function(event) {
        if (event.key == "Escape") {
            if ($('#floatSetting').is(":visible"))
                $('#floatSetting, #fullpage').toggle();
        }
    });
    $(window).on('popstate', function(event) {
        // if ($('#floatSetting').is(":visible"))
            // $('#floatSetting, #fullpage').toggle();
    });


    // music button
    var playMusic = false;
    var songReady = false;
    var randomSong = songs[Math.floor(Math.random() * songs.length)];
    $('#bgSong').attr('src', 'songs/' + randomSong);
    $('#bgSong').get(0).addEventListener("canplay",function(){
        songReady = true;
    });

    $('#music').click(function(){
            playMusic = $('#music').is(':checked');
            $('#sound').text(playMusic?'music_note':'music_off');
            
            var bgSong = $('#bgSong').get(0);
            if (bgSong)
            {
                if (songReady){
                    if (playMusic) {
                        // console.info('play');
                        bgSong.play();
                    }
                    else {
                        // console.info('pause');
                        bgSong.pause();
                    }
                }

            } 
    })

    // theme selector
    var defaultTheme = 'elegant';
    
    for (let k in themes) {
        $('#theme').append($('<option>').val(k).text(themes[k]));
    } 

    $('#theme').on('change', function(){
        var theme = $('#theme').val();
        if (theme==null) theme = defaultTheme;
        $('#cssTheme').attr('href', 'css/' + theme + '.css');

        var bodyStyles = window.getComputedStyle(document.body);
        var themeColor = bodyStyles.getPropertyValue('--ua-pallete-3');
        $("#themeColor").attr('content', themeColor);
        });

    var selectedTheme = params['theme'];
    if (!selectedTheme) selectedTheme = 'elegant';
    if (selectedTheme=='random'){
        var r = Math.floor(Math.random() * Object.keys(themes).length);
        var c = 0;
        for (let k in themes) {
            if (c++ == r) selectedTheme = k;
        }
    }
    // console.info('theme:', selectedTheme);
    $('#theme').val(selectedTheme).change();


});