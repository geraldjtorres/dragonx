import "../styles/main.scss";
import "../index.html";
import "../ourStory.html";
import "../becomeAPartner.html";
import $ from 'jquery';
require("bootstrap-grid");
require('fullpage.js');

// import data from '../data/data.json';
const ourStoryData = require('../data/data.json');

// load assets
function requireAll(r) { r.keys().forEach(r); }
requireAll(require.context('../assets/img/', true));


console.log('You are on OUR STORY page');

console.log('JSON FILE WOOP: ', ourStoryData);


// html templates
const headerTemplate = (title) => {
  return `
    <div class="header-slide">
     <div class="animate-box">
       <h1 class="animate-header">${title}</h1>
     </div>
    </div>
  `
}

const paragraphTemplate = (paragraph) => {
  return `
    <div class="paragraph-slide">
      <div class="animate-box">
        <p class="animate-paragraph">${paragraph}</p>

      </div>
    </div>
    `
}

// I use the .map() method to loop over the array that contains the JSON data and output a snippet of HTML
document.getElementById("ourStoryFullPage").innerHTML =  `
${ourStoryData.map(function(slide, index) {
return `
<div class="ourStory section">
  <div class="content-slide">
      ${slide.title === "" ?
        ''
        :

        `${slide.title.map(headerTemplate).join('')}`
      }

      ${slide.paragraph.map(paragraphTemplate).join('')}

      ${slide.subText ?
        `
          <div class="learn-more-slide">
            <div class="animate-box">
              <p class="animate-link">${slide.subText} <a href="${slide.linkRef}" target="_blank" class="link-text">CapSpeciality.com</a></p>
            </div>
          </div>

        `
        : ''
      }
    </div>
  </div>
</div>
`
}).join('')}
`;

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
  $( ".bg-1" ).removeClass( "fade-out" );
  $( ".bg-1" ).addClass( "fade-in" );
}

const backgroundFadeOut = () => {
  $( ".bg-1" ).addClass( "fade-out" );
  $( ".bg-1" ).removeClass( "fade-in" );
}

const animateTextUp = () => {
  $( ".animate-header" ).addClass( "slide-up text-delay" );
  $( ".animate-paragraph" ).addClass( "slide-up text-delay" );
  $( ".extra-paragraph" ).addClass( "slide-up-extra-paragraph text-delay" );
}

const animateTextDown = () => {
  $( ".animate-header" ).removeClass( "slide-up text-delay" );
  $( ".animate-paragraph" ).removeClass( "slide-up text-delay" );
  $( ".extra-paragraph" ).removeClass( "slide-up-extra-paragraph text-delay" );
}


//Fullpage js plugin settings
$('#ourStoryFullPage').fullpage({

  onLeave: function(index, nextIndex, direction){
      if(index == 1 && direction =='down'){
        //background fade out
      backgroundFadeOut();
      animateTextDown();
      $( ".hero-image" ).removeClass( "slide-up hero-image-delay" );

      $( ".scroll-label" ).addClass( "slide-left" );
      $( ".scroll-line" ).addClass( "slide-down" );

      delaySlider(nextIndex);
      return animationIsFinished;

    }

    else if(index == 2 && direction == 'up'){
    // background fades in
      backgroundFadeIn();
      animateTextDown();

      // Animation to animate in the scroll label
      $( ".scroll-label" ).removeClass( "slide-left" );
      $( ".scroll-line" ).removeClass( "slide-down" );

      delaySlider(nextIndex);
      return animationIsFinished;
    }

    else if(index == 3 && direction == 'down'){
      animateTextDown();
      $( ".animate-link" ).addClass( "link-slide-up text-delay" );
      delaySlider(nextIndex);
      return animationIsFinished;
    }

    else if(index == 4 && direction == 'down'){
      $( ".bg-2" ).addClass( "fade-in" );
      delaySlider(nextIndex);
      return animationIsFinished;
    }

    else if(index == 4 && direction == 'down'){
      animateTextDown();
      $( ".animate-link" ).removeClass( "link-slide-up text-delay" );
      delaySlider(nextIndex);
      return animationIsFinished;
    }

    else if(direction == 'down' || direction == 'up'){
      animateTextDown();


      delaySlider(nextIndex);
      return animationIsFinished;
    }
  },
  afterLoad: function(anchorLink, index){
    if(index == 1 || index == 2){
      animateTextUp();
    }

    else if (index == 3) {

      // Animation to fade out background
      $( ".bg-2" ).removeClass( "fade-in" );
      $( ".bg-2" ).addClass( "fade-out" );
      animateTextUp();
    }

    else if (index == 4) {
      // Animation to fade in background
      $( ".bg-2" ).addClass( "fade-in" );
      animateTextUp();

    }

  }
});



