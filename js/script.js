var playing = false;
var firstTime = true;
var showingBtn = true;
var audio = new Audio('music/pepepepepepe.mp3');
var images = new Array();
var howMany = 13;
var lastFive = [];
var imgSeen = [];
var imgPos = 0;
var konCode = [38,38,40,40,37,39,37,39,66,65];
var konPos = 0;
var konUnlocked = false;

$(function(){
  $(window).load(function() {
    if (document.images) {
        for (var i = 1; i < howMany+1; i++) {
          images[i] = new Image();
          images[i].src = "images/"+ i +".gif";
          $('#imgSquaresList').append('<li class="box"></li>');
          var percent = i / howMany * 100;
          $('#loadPercentText').text(percent.toFixed(0) + '%');
        }
    }
    for (var i = konCode.length - 1; i >= 0; i--) {
      $('#konSquareList').append('<li class="box"></li>');
    }
    $('#loading').fadeOut(500);
    $('#btn').fadeIn(1000);
    $( ".clickable" ).click(function() {
      if (!playing){
        var ran =  Math.floor((Math.random() * howMany) + 1);
        while (lastFive.includes(ran)){
          ran = Math.floor((Math.random() * howMany) + 1);
        }
        lastFive.push(ran);
        if (lastFive.length > 5) lastFive.shift();
        if (!imgSeen.includes(ran)) {
          imgSeen.push(ran);
          if (imgSeen.length >= howMany) codeUnlocked();
          paintNextImg();
        }
        if($('#btnContainer').css('display') != 'none') changeImage(ran);
      }
      changeBackground(ran);
      toggleMusic();
      $(".clickable").toggle();
    }); 
  });
});	

function changeBackground(ran) {
  if (konUnlocked){
    $('#konSquares').toggle();
    $('#imgSquares').toggle();
    return;
  }
  if($('#btnContainer').css('display') == 'none'){
    $('body').css('background', '#FFFFFF');  
    $('#konSquares').show();
    $('#imgSquares').show();
  }
  else{
    if (ran == 1)
      $('body').css('background', 'rgb(223, 156, 141)');
    else if (ran == 2)
      $('body').css('background', 'rgb(62,80,94)');
    else if (ran == 3)
      $('body').css('background', 'rgb(0, 0, 0)');
    else if (ran == 6)
      $('body').css('background', 'rgb(191, 174, 134)');
    else if (ran == 7)
      $('body').css('background', 'rgb(241, 231, 210)');
    else
      $('body').css('background', 'rgb(255, 255, 255)');
    $('#konSquares').hide();
    $('#imgSquares').hide();
  }
}

function toggleMusic(){
  if (playing) audio.pause();
  else audio.play();
  playing = !playing;
}

$( "html" ).keydown(function( event ) {
  if (konUnlocked) return;
  if ( event.which == 13 ) {
     event.preventDefault();
  }
  if (event.keyCode == konCode[konPos]) {
    konPos++;
    for (var i = 0; i < konPos; i++) {
      $('#konSquareList').children().eq(i).addClass("filledBoxOrange");
      $('#konSquareList').children().eq(i).addClass("box");
    }

  } else {
    $('#konSquareList').children().addClass("box");
    $('#konSquareList').children().removeClass("filledBoxOrange");
    konPos = 0;
  }
  if (konPos >= konCode.length ) codeUnlocked();
});

function codeUnlocked(){
  console.log('konami unlocked!');
  konUnlocked = true;
  imgPos = howMany -1;
  paintAllImg();
}

function paintNextImg(){
  $('#imgSquaresList').children().eq(imgPos++).addClass("filledBoxPink");
}

function paintAllImg(){
  $('#imgSquaresList').children().addClass("filledBoxPink");
}



function changeImage(ran){
  $('#imgContainer').empty();
  if (!konUnlocked){
    if (ran == 5){
      for (var i = 0; i < 100; i++) {
        $('#imgContainer').append('<img id="dance'+ i + '"  class="dance center" src="images/5.gif" />');
        var ver = 90 + Math.floor((Math.random() * $( window ).height() * 1.6) - $( window ).height());
        var hor = 160 + Math.floor((Math.random() * $( window ).width() * 1.7) - $( window ).width());
        $('#dance'+i).css({top: ver, left: hor, position:'absolute'});
      }
      
    }
    else{
      $('#imgContainer').append('<img id="dance"  class="dance center" src="" />');
    }
    if (ran >= 7) $('.dance').addClass("fillScreen");
    else $('.dance').removeClass("fillScreen");
    if (ran == 3) {
      $('.dance').addClass("bottom");
      $('.dance').removeClass("center");
    }
    else{
      $('.dance').addClass("center");
      $('.dance').removeClass("bottom");
    }
    
    $('.dance').attr("src", images[ran].src);
  }
  else{
    for (var i = 0; i < 100; i++) {
      $('#imgContainer').append('<img id="dancePik'+ i + '"  class="dance center" src="images/5.gif" />');
      $('#imgContainer').append('<img id="danceCarl'+ i + '"  class="dance center" src="images/4.gif" />');
      var ver = 90 + Math.floor((Math.random() * $( window ).height() * 1.6) - $( window ).height());
      var hor = 160 + Math.floor((Math.random() * $( window ).width() * 1.7) - $( window ).width());
      $('#dancePik'+i).css({top: ver, left: hor, position:'absolute'});
      var ver = 200 + Math.floor((Math.random() * $( window ).height() * 1.4) - $( window ).height());
      var hor = 160 + Math.floor((Math.random() * $( window ).width() * 1.7) - $( window ).width());
      $('#danceCarl'+i).css({top: ver, left: hor, position:'absolute', width:'175px', height:'250px'});
    }
    var ver = Math.floor((Math.random() * $( window ).height() * 1.6) - $( window ).height());
    var hor = Math.floor((Math.random() * $( window ).width() * 1.6) - $( window ).width());
    $('#imgContainer').append('<img id="Wally" class="dance center" src="images/wally.png" />');
    $('#Wally').css({top: ver, left: hor, width:'21px', height:'41px', position:'absolute'});
    startCoupleAnimation();
  }
}

function startCoupleAnimation(){

}

jQuery.fn.center = function () {
    $(this).css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : function() {return -$(this).outerWidth()/2},
        'margin-top' : function() {return -$(this).outerHeight()/2}
    });
    return this;
}