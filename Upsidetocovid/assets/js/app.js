const intro = document.querySelector(".set-height");
const video = intro.querySelector("#video");
const text = intro.querySelector("p");
const head = document.querySelector("h1");

//SCROLLMAGIC
const controller = new ScrollMagic.Controller();

//Scenes
let scene = new ScrollMagic.Scene({
  duration: 4000,
  triggerElement: intro,
  triggerHook: 0.15
})
  //.addIndicators() to show start and end indicators
  .setPin(intro)
  .addTo(controller);


//Video Animation 
let accelamount = 1;
let scrollpos = 0;
let delay = 0;

scene.on("update", e => {
  scrollpos = e.scrollPos / 1000;
});

setInterval(() => {
  delay += (scrollpos - delay) * accelamount;
  console.log(scrollpos, delay);
  video.currentTime = scrollpos;

  //text.innerHTML = content;
  //video.currentTime = scrollpos;
}, 1); //1000 divided by fps
//text anim
var content = "Amid the upheaval and distress, there always are reasons to believe we can emerge from this with a few positives. Instead of thinking about what we can't do in quarantine, let's think about what we can do instead. Stay home, stay safe and look foward to a better day. But until then, use your time wisely - here are few ideas just a <a href='ideas.html'>click</a> away.";
const textAnim = TweenMax.fromTo(text, 5, { opacity: 0 }, { opacity: 1, innerHTML: content });


let scene2 = new ScrollMagic.Scene({
  duration: 5000,
  triggerElement: intro,
  triggerHook: 0
})
  .setTween(textAnim)
  .addTo(controller);


var mytim;
$("#down").click(function () {
  $("#video").css('visibility', 'hidden');
  $("#video2").trigger('play');
  mytim = setTimeout(function () { video.style.visibility = "visible" }, 5000);
  $('html, body').animate({
    scrollTop: $(document).height()
  }, 5000);
});