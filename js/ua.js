var themes = {
    'elegant'   : 'Elegant',
    'clean'     : 'Clean',
    'dark'      : 'Dark Mode',
    // 'fancy'     : 'Fancy',
    'pink'      : 'Pinky'
};

var songs = {
    'W4toJlqM_50' : '조금씩 천천히',
    'f4crKVutaS0' : 'Beyond My Dreams',
    'u3IydjQzJIg' : 'First Love',
    'brDjam33BfE' : 'Forever Love',
    'YW1k9qhcUEI' : 'La Vie en Rose (Piano)',
    'bSv4yesuaMQ' : 'Mahana',
    '5WGTCsk3KC4' : 'Married Life (Piano)',
    'VWEWJDJcA_A' : 'Married Life (Flute)',
    '2meKbkpUpbg' : 'Picnic'
};

function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        if (hash[1] && hash[1].indexOf("#")>0) hash[1] = hash[1].split('#')[0];
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$(document).ready(function(){

    var params=getUrlVars()

    var nama = (params && params['to'])? decodeURI(params['to']) : '';
    
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

    // music button
    var playMusic = false;
    var songReady = false;
    
    for (let k in songs) {
        $('#songs').append($('<option>').val(k).text(songs[k]));
    } 
    var playNow = function(){
        playMusic = $('#music').is(':checked');
        $('#sound').text(playMusic?'music_note':'music_off');
        
        var bgSong = $('#bgSong').get(0);

        if (bgSong && songReady){
                if (playMusic) 
                    bgSong.play();
                else 
                    bgSong.pause();
        }
    }
    $('#songs').on('change', function(){        
        var song = $('#songs').val();
        if (song!=null) {
            $('#bgSong source').attr('src', 'songs/' + song + '.mp3');
            $('#bgSong').get(0).load();
            playNow();
        }
    });
    $('#bgSong').get(0).addEventListener("canplay",function(){
        songReady = true;
    });
    
    var r = Math.floor(Math.random() * Object.keys(songs).length);
    var randomSong = null;
    var c = 0;
    for (let k in songs) {
        if (c++ == r) randomSong = k;
    }
    $('#songs').val(randomSong).change();

    $('#music').click(function(){ 
        playNow();
    });

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

    // fullpage
    var myFullpage = new fullpage('#fullpage', {
        licenseKey: 'gplv3-license',
        anchors: ['front','love', 'time', 'quote'],
        // sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        // responsiveHeight: 370,
        // continuousVertical: true,
        // loopBottom: true, loopTop: true,
        navigation: true,
        navigationPosition: 'left',
        css3: true        
    });

    // lang
    $('#lang').on('change', function(){
        var ln = $(this).val();
        i18next.changeLanguage(ln);
        $('body').localize();
    });
    // use plugins and options as needed, for options, detail see
    // https://www.i18next.com
    i18next 
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    //.use(i18nextBrowserLanguageDetector)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        debug: true,
        fallbackLng: 'id',
        resources: {
        id :{
            translation: {
                'home' : {
                    'celebration': "Walimatul 'Urs",
                    'greetName' : 'Yth. Bapak/Ibu/Saudara/i',
                    'sorryName' : 'Mohon maaf jika ada kesalahan <span class="nowrap">penulisan nama dan gelar</span>'
                },
                'love'  : {
                    'intro': 'Dengan memohon rahmat dan ridho <span class="nowrap">Allah SWT</span> kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada <span class="nowrap">Walimatul \'Urs</span>:',
                    'parentBride': 'Putri dari <br><span class="nowrap">Bapak Abdul Kadir Sobur</span> <br>dan <span class="nowrap">Ibu Rosmala</span>',
                    'parentGroom': 'Putra dari <br><span class="nowrap">Bapak M. Yassir Aragil (alm.)</span> <br>dan <span class="nowrap">Ibu Susyandari</span>'
                },
                'time'  : {'place': 'Ahad<br>3 Desember, 2023<br>Gedung LPMP Jambi', 'akad': '07.00 - 08.00 WIB', 'akadHeading': 'Akad Nikah', 'resepsi': '10.00 WIB - selesai', 'resepsiHeading': 'Resepsi'},
                'quote' : {'translation': 'Dan segala sesuatu Kami ciptakan berpasang-pasangan agar kamu mengingat (kebesaran Allah)'}
            }
        },
        en: {
            translation: {
                'home' : {
                    'celebration': 'The Wedding of',
                    'greetName' : 'Dear Mr/Mrs/Ms',
                    'sorryName' : "We'd like to apologize for name and title spelling error."
                },
                'love'  : {
                    'intro': 'You are cordially invited to <span class="nowrap">Wedding Celebration</span>:',
                    'parentBride': 'Daughter of <span class="nowrap">Mr. Abdul Kadir Sobur</span> <br>and <span class="nowrap">Mrs. Rosmala</span>',
                    'parentGroom': 'Son of <br><span class="nowrap">Mr. M. Yassir Aragil (alm.)</span> <br>dan <span class="nowrap">Mrs. Susyandari</span>'
                },
                'time'  : {'place': 'Sunday<br>December 3rd, 2023<br>LPMP Jambi Building', 'akad': '07.00 - 08.00 GMT+7', 'akadHeading': 'Ceremonial', 'resepsi': 'start at 10.00 GMT+7', 'resepsiHeading': 'Banquet'},
                'quote' : {'translation': 'And We created pairs of all things so perhaps you would be mindful'}
            }
        },
        jv : {
            translation: {
                'home' : {
                    'celebration': "Walimatul 'Urs",
                    'greetName' : 'Ingkang kinurmatan Bapak/Ibu/Sedherek',
                    'sorryName' : "Nyuwun pangapunten menawi wonten asma kaliyan irah-irahan ingkang lepat"
                },
                'love'  : {
                    'intro': 'Nuwun kanthi lumunturing rahmating Gusti Allah SWT, keparenga kula ngaturi rawuh panjenengan dhumateng <span class="nowrap">Walimatul \'Urs</span>:',
                    'parentBride': 'Putri <br><span class="nowrap">Bapak Abdul Kadir Sobur</span> <br>kaliyan <span class="nowrap">Ibu Rosmala</span>',
                    'parentGroom': 'Putra <br><span class="nowrap">Bapak M. Yassir Aragil (alm.)</span> <br>kaliyan <span class="nowrap">Ibu Susyandari</span>'
                },
                'time'  : {'place': 'Ahad<br>3 Desember, 2023<br>Gedung LPMP Jambi', 'akad': '07.00 - 08.00 WIB', 'akadHeading': 'Akad Nikah', 'resepsi': '10.00 WIB - rampung', 'resepsiHeading': 'Resepsi'},
                'quote' : {'translation': 'Lan samubarang iku padha Ingsun titahaké ajodhon-jodhon, darapon sira padha angalap éling'}
            }
            

        }
        }
    }, (err, t) => {
        if (err) return console.error(err);

        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $, { useOptionsAttr: true });

        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        $('body').localize();
    });

});