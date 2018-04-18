var playing = false;
var firstTime = true;
var showingBtn = true;
var audio = new Audio('music/pepepepepepe.mp3');
var images = new Array();
var howMany = 13;

$(function(){
  $(window).load(function() {
    if (document.images) {
        for (var i = 1; i < howMany+1; i++) {
          images[i] = new Image();
          images[i].src = "images/"+ i +".gif";
          var percent = i / howMany * 100;
          $('#loadPercentText').text(percent.toFixed(0) + '%');
        }
    }
   $('#loading').fadeOut(500);
   $('#btn').fadeIn(1000);
    $( ".clickable" ).click(function() {
      ran = Math.floor((Math.random() * howMany) + 1);
      if($('#btnContainer').css('display') != 'none') changeImage(ran);
      changeBackground(ran);
      toggleMusic();
      $(".clickable").toggle();
    }); 
  });
});	

function changeBackground(ran) {
  if($('#btnContainer').css('display') == 'none')
    $('body').css('background', '#FFFFFF');  
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
  }
}

function toggleMusic(){
  if (playing) audio.pause();
  else audio.play();
  playing = !playing;
}

function playSound(el,soundfile) {
    if (el.mp3) {
        if(playing) el.mp3.pause();
        else el.mp3.play();
    } else {
        el.mp3 = new Audio(soundfile);
        el.mp3.play();
        firstTime = false;
    }
    playing = !playing;
}

function changeImage(ran){
  $('#imgContainer').empty();
  if (ran == 5){
    for (var i = 0; i < 100; i++) {
      $('#imgContainer').append('<img id="dance'+ i + '"  class="dance center" src="images/5.gif" />');
      var ver = Math.floor((Math.random() * $( window ).height() * 2) - $( window ).height());
      var hor = Math.floor((Math.random() * $( window ).width() * 2) - $( window ).width());
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
  //$('.dance').attr("src","images/" + ran + ".gif");
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