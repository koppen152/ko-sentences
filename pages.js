/*
  Note: For this to be a module usable with other files, it must have a
    global scope. This creates a situation in which a malicious person on a
    computer could edit the data and could produce tainted results.

    Best practice to fix this issue is to write implementation in a seperate
      file, and then to wrap all together when it moves to production.
      Realistically, this is not a huge issue, as the code will be run on an
      iPad, which cannot edit code.

    DO NOT RUN THIS ON MECHANICAL TURK. The data could be suspect of
      tampering, because it is not. Note that this is not only the case for
      this code, but also for most other code. The amount of interest in
      tampering with data is low, so it is not a huge issue.
*/

// A page can be played or stopped
class Page {
  constructor(pageID) {
    this.pageID = pageID;

    this.timeouts = [];
    this.intervals = [];
  }

  setTimeout(fn, dt) {
    this.timeouts.push(setTimeout(fn, dt));
  }

  setInterval(fn, dt, startImmediately) {
    if( startImmediately ) {
      fn();
    }
    this.intervals.push(setInterval(fn, dt));
  }

  play() {}

  deactivate() {
    for (var i=0; i<this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }

    for (var i=0; i<this.intervals.length; i++) {
      clearInterval(this.intervals[i]);
    }
  }
}

// set of pages
class Book {
  constructor(pages, buffer_time) {
    if (buffer_time == undefined) {
      buffer_time = 0;
    }

    this.buffer_time = buffer_time;
    this.pages = pages;
    this.current_page = -1;
  }

  nextpage() {
    if (this.current_page > -1) {
      this.pages[this.current_page].deactivate();
    }

    setTimeout(function() {
      this.current_page++;
      if (this.current_page < this.pages.length) {
        this.pages[this.current_page].play();
      } else {
        $("img").hide()
        $("#end").show()
      }
    }.bind(this), this.buffer_time * 1000);
  }
}

var globalBook;

// The universal next-page bind
$(".exit").bind("click touch", function() {
  globalBook.nextpage();
});

function run_book(book) {
  globalBook = book;

  globalBook.nextpage()
}
