// Modify this class so that constructor will optionally let you specify a fixed banner width at the time the Banner object is created.
// The message in the banner should be centered within the banner of that width.
// Decide for yourself how you want to handle widths that are either too narrow or too wide.

class Banner {
  constructor(message, bannerWidth) {
    
    if (message.length > 76) {
      message = message.slice(0, 76);
    }
    
    if (bannerWidth && bannerWidth > 80) {
      bannerWidth = 80;
    }
    
    if (bannerWidth && (bannerWidth) < 5) {
      bannerWidth === message.length + 4;
    }
    
    if (bannerWidth && (message.length + 4 > bannerWidth)) {
      message = message.slice(0, bannerWidth - 4);
    }
    
    this.message = message;
    this.bannerWidth = bannerWidth ? bannerWidth : message.length + 4;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.bannerWidth - 4)}-+`;
  }
  emptyLine() {
    return `| ${' '.repeat(this.bannerWidth - 4)} |`;
  }
  messageLine() {
    let spacesNeeded = this.bannerWidth - this.message.length - 4;
    let spacesBuffer = spacesNeeded ? spacesNeeded / 2 : 0;
    
    return `| ${' '.repeat(spacesBuffer)}${this.message}${' '.repeat(spacesBuffer)} |`;
  }
}


let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+

let banner3 = new Banner('Hey there baby', 60);
banner3.displayBanner();

let banner4 = new Banner('Once upon a time there as a picnic basket that lived inside of a pantry inside of a house that was on Zachary Lane in Maple Grove, Minnesota.');
banner4.displayBanner();

let banner5 = new Banner('Dude', 5);
banner5.displayBanner();