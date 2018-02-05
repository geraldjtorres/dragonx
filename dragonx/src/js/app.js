import "../styles/main.scss";
import "../index.html";
import "../ourStory.html";
import "../becomeAPartner.html";
import $ from 'jquery';
require("bootstrap-grid");
require('fullpage.js');
console.log('You are on About us page');
// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../assets/img/', true));


const delay = 100; //milliseconds
let timeoutId;
let animationIsFinished = false;


// A function that delays the slider from changing when the user scrolls up or down
const delaySlider = (nextIndex) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(function(){
    animationIsFinished = true;
    $.fn.fullpage.silentMoveTo(nextIndex);
    animationIsFinished = false;
  }, delay);
}

// Animation functions

const backgroundFadeIn = () => {
  $( ".bg" ).removeClass( "fade-out" );
  $( ".bg" ).addClass( "fade-in" );
}

const backgroundFadeOut = () => {
  $( ".bg" ).addClass( "fade-out" );
  $( ".bg" ).removeClass( "fade-in" );
}

const animateTextUp = () => {
  $( ".animate-header" ).addClass( "slide-up text-delay" );
  $( ".animate-paragraph" ).addClass( "slide-up text-delay" );
}

const animateTextDown = () => {
  $( ".animate-header" ).removeClass( "slide-up text-delay" );
  $( ".animate-paragraph" ).removeClass( "slide-up text-delay" );
}

const animatePageNumbersIn = () => {
  $( ".page-number" ).addClass( "slide-up page-number-delay-down" );
  $( ".animate-page-line" ).addClass( "fade-in page-number-delay-down" );
}

const animateScrollTextOut = () => {
  $( ".hero-image" ).removeClass( "slide-up hero-image-delay" );
  $( ".scroll-label" ).addClass( "slide-left" );
  $( ".scroll-line" ).addClass( "slide-down" );
}

const animateScrollTextIn = () => {
  $( ".hero-image" ).addClass( "slide-up hero-image-delay" );
  $( ".scroll-label" ).removeClass( "slide-left" );
  $( ".scroll-line" ).removeClass( "slide-down" );
}

//Fullpage js plugin settings
$('#fullpage').fullpage({

  afterRender: function(){
    $( ".hero-image" ).addClass( "slide-up" );
  },

  onLeave: function(index, nextIndex, direction){
      if(index == 1 && direction =='down'){
        //background fade out
      backgroundFadeOut();

      animateScrollTextOut();

      animatePageNumbersIn();


      delaySlider(nextIndex);
      return animationIsFinished;

    }

    else if(index == 2 && direction == 'up'){
    // background fades in
     backgroundFadeIn();
     animateScrollTextIn();

     // ANIMATION FOR PAGE NUMBERS
      $( ".page-number" ).removeClass( "slide-up page-number-delay-down" );
      $( ".animate-page-line" ).removeClass( "fade-in page-number-delay-down" );


      animateTextDown();

      delaySlider(nextIndex);
      return animationIsFinished;
    }

    else if(direction == 'down'){
      animateTextDown();
      // ANIMATION FOR PAGE NUMBERS
      $( ".top-number" ).removeClass( "slide-up page-number-delay-down" );

      delaySlider(nextIndex);
      return animationIsFinished;
    }
    else if(direction == 'up'){
      animateTextDown();
      // ANIMATION FOR PAGE NUMBERS
      $( ".top-number" ).removeClass( "slide-up page-number-delay-up" );
;

      delaySlider(nextIndex);
      return animationIsFinished;
    }
  },
  afterLoad: function(anchorLink, index){
    if(index == 2 || index == 3 || index == 4 || index == 5){
      // alert("Section 3 ended loading");
      animateTextUp();
      // ANIMATION FOR PAGE NUMBERS
      $( ".top-number" ).addClass( "slide-up page-number-delay-up" );
      $( ".top-number" ).text( index - 1 );
    }
  }
});



