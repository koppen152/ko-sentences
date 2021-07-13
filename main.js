class AudioAtlas {
   constructor(atlasObject) {
      this.file = atlasObject.file;
      this.locations = atlasObject.locations;
 
      this.audioend = 0;
      this.pausing = false;
      this.afterfunction = function(){};
 
      this.audio = new Audio(this.file);
      this.audio.addEventListener("canplaythrough", function() {
         if (!this.loaded) {
            this.loaded = true;
            this.audio.pause();
            console.log("canplaythrough");
         }
      }.bind(this));
 
      this.audio.addEventListener('timeupdate', function() {
         if (this.audio.currentTime >= this.audioend) {
            if (!this.pausing) {
               this.audio.pause();
               this.pausing = true;
               console.log("pausing");
               this.afterfunction(); // double check that this is only run once
            }
         }
      }.bind(this), false);
 
      this.audio.addEventListener('stalled', function() {
         if (this.audio.currentTime >= this.audioend) {
            alert("Audio is not loading. Please check internet connection. Reloading now.");
   
            this.audio.load();
            this.audio.pause();
         }
      }.bind(this), false);
 
      this.loaded = false;
   }
 
   playFile(name) {
     if (name in this.locations) {
       this.playTime(this.locations[name].start, this.locations[name].length);
     } else {
       console.log(`FILE ${name} not available in atlas`);
     }
   }
 
   playTime(start, length) {
     if (this.loaded) {
       this.audio.currentTime = start + 2;
 
       console.log(`Start: ${start}\nEnd:${start+length}`);
 
       this.audioend = start+length;
       this.audio.play();
       this.pausing = false;
     } else {
       console.log("CANNOT play audio because it is unloaded.");
     }
   }
 
   initialize() {
     if (!this.loaded) {
       this.audio.play();
     }
   }
 
   paused() {
     return this.audio.paused;
   }
 
   pause() {
     this.audioend = 0;
   }
 }
 
 _global_audio = undefined;
 $(window).on("load", function() {
   _global_audio = new AudioAtlas(_global_audio_object);
 });
 
 $("input").bind("click touch", function() {
   console.log("OKAY");
   _global_audio.initialize();
});
 
 
function play_audio(file, afterfunction) {
   _global_audio.pause();
   if (file == undefined) {
      console.log("NO LOAD");
   
      afterfunction();
   } else {
      _global_audio.afterfunction = afterfunction;
   
      _global_audio.playFile(file);
   }
}
 
class AudioPage extends Page {
   constructor(pageID, audio, delay) {
      super(pageID);
   
      this.audiofile = audio;
      this.delay = delay;
   }
 
   after_audio() {}
 
   play_audio() {
      play_audio(this.audiofile, function() {
         (this.after_audio.bind(this))();
      }.bind(this));
   }
 
   play() {
      this.setTimeout(this.play_audio.bind(this), this.delay);
   }
 
   deactivate() {
      super.deactivate();
      _global_audio.pause();
   }
}
 
class TitledDocPage extends Page {
   constructor(pid, head, text, width_str, fontsize, buttontext, audio) {
      super(pid);
 
      this.head = head;
      this.text = text;
      this.width = width_str;
      this.fontsize = fontsize;
 
      this.buttontext = buttontext;
   }
 
   after_audio() {
      $("#titled-doc-page > div > input").removeAttr("disabled");
   }
 
   play() {
      super.play();
      $("#titled-doc-page").css("--form-width", this.width)
      $("#titled-head").html(this.head);
      $("#titled-body").html(this.text);
      $("#titled-body").css("font-size", this.fontsize);
   
      if (this.buttontext == "") {
         $("#titled-doc-page > div > input ").hide();
      } else {
         $("#titled-doc-page > div > input ").show();      
         $("#titled-doc-page > div > input ").attr("value", this.buttontext);
      }
   
      $("#doc-page > div > input").attr("disabled", "disabled")
   
      $("#titled-doc-page").show();
   }
 
   deactivate() {
     super.deactivate();
 
     $("#titled-doc-page").hide();
   }
}
 
 
 // $("#skip").bind("click touch", function() {
 //   console.log("helo");
 //   globalBook.pages[globalBook.current_page].deactivate();
 //   globalBook.current_page = globalBook.pages.length - 3;
 //   globalBook.pages[globalBook.current_page].play();
 // });
 
 // Make the DIV element draggable:
 
var els = document.getElementsByClassName("moveable");
 
dragElement(els[0]);
dragElement(els[1]);
dragElement(els[2]);
dragElement(els[3]);
 
var max_z = 1;
 
function dragElement(elmnt) {
   var fingerOffX = 0;
   var fingerOffY = 0;
 
   elmnt.ontouchstart = startDrag;
   elmnt.onmousedown = startDrag;
 
   function startDrag(e) {
     e = e || window.event;
     // get the mouse cursor position at startup:case
 
     var posX = e.pageX || e.touches[0].clientX;
     var posY = e.pageY || e.touches[0].clientY;
 
     max_z++;
     $(elmnt).css("z-index", max_z);
 
     fingerOffX = parseInt($(elmnt).css("left")) - posX;
     fingerOffY = parseInt($(elmnt).css("top")) - posY;
 
     document.ontouchend = endDrag;
     document.onmouseup = endDrag;
 
     document.ontouchmove = continueDrag;
     document.onmousemove = continueDrag;
   }
 
   function continueDrag(e) {
     e = e || window.event;
     e.preventDefault();
 
     var posX = e.pageX || e.touches[0].clientX;
     var posY = e.pageY || e.touches[0].clientY;
 
     $(elmnt).css("left", (posX + fingerOffX) + "px");
     $(elmnt).css("top", (posY + fingerOffY) + "px");
   }
 
   function endDrag() {
     // stop moving when mouse button is released:
     document.onmouseup = null;
     document.onmousemove = null;
 
     document.ontouchend = null;
     document.ontouchmove = null;
   }
}
 
class Diamond extends AudioPage {
   constructor(audio, im1, im2, im3, im4, random) {
     super("audio", audio, 0); // 700
     this.im1 = im1;
     this.im2 = im2;
     this.im3 = im3;
     this.im4 = im4;
 
   if (random) {
      if (Math.random() > 0.5) {
         this.im1 = im3;
         this.im3 = im1;
      }
 
      if (Math.random() > 0.5) {
         this.im2 = im4;
         this.im4 = im2;
      }
     }
   }
 
   after_audio() {
     $("#next").css("pointerEvents", "auto");
   }
 
   play() {
     var height = $(window).height();
     var width = $(window).width();
     var size = Math.min(height, width);
     var padding=20;
     var boxsize = size / 3 - 2 * padding;
 
     $("#one > img").attr("src", this.im1);
     $("#two > img").attr("src", this.im2);
     $("#three > img").attr("src", this.im3);
     $("#four > img").attr("src", this.im4);
 
     $(".moveable").css({"width":(boxsize) + "px",
                         "height":(boxsize) + "px"});
 
     $(".moveable > img").css({"max-width":(boxsize-10) + "px",
                               "max-height":(boxsize) + "px"});
 
     $("#one").css({"right": `${padding}px`,
                    "top":  `calc(50% - ${boxsize / 2}px)`,
                    "left":""});
 
     $("#two").css({"right": `calc(50% - ${boxsize / 2}px)`,
                    "bottom":  `calc(50% + ${boxsize / 2 + padding}px)`,
                    "left":"",
                    "top":""});
 
     $("#three").css({"left": `${padding}px`,
                    "top":  `calc(50% - ${boxsize/2}px)`});
 
     $("#four").css({"left": `calc(50% - ${boxsize / 2}px)`,
                    "top":  `calc(50% + ${boxsize / 2 + padding}px)`});
 
 
 //    $("#two").css(this.im2);
 //    $("#three").css(this.im3);
 //    $("#four").css(this.im4);
 
     $("#next").css("pointerEvents", "none");
 
     super.play();
     this.setTimeout(
       function(){$("#diamond").show();},
       0); // 500
   }
 
   deactivate() {
     $("#diamond").hide();
   }
}
 
 // This is the Fisher-Yates shuffle
 // Taken from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
   var m = array.length, t, i;
 
   // While there remain elements to shuffle…
   while (m) {
 
     // Pick a remaining element…
     i = Math.floor(Math.random() * m--);
 
     // And swap it with the current element.
     t = array[m];
     array[m] = array[i];
     array[i] = t;
   }
 
   return array;
}