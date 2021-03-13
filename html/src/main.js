window.onload = function () {
  var tapable = document.getElementById('tapable');
  var control = {
    reset: document.getElementById('reset')
  };
  var display = {
    time: tapable.querySelector('.time'),
    rate: tapable.querySelector('.rate')
  };

  function zeroLead (number) {
    return (number < 10 ? '0' : '') + number;
  }

  function parseTime (time) {
    var minutes = Math.floor(time / 60000);
    var seconds = (Math.floor(time % 60000) / 1000).toFixed(3);

    return zeroLead(minutes) + ':' + zeroLead(seconds);
  }

  function parseBits (bits) {
    return bits.toFixed(1) + ' bpm'
  }

  var counter = {
    items: [],
    tap: function () { this.items.push(Date.now()); },
    reset: function () { this.items = []; },
    getTime: function () { return this.items[0] ? Date.now() - this.items[0] : 0; },
    getRate: function () {
      if (this.items.length < 3) {
        return 0;
      }

      var delay = (
        this.items[this.items.length - 1] - this.items[0]
      ) / (this.items.length - 1);

      return 60000 / delay;
    }
  };

  function displayCounter () {
    display.time.innerText = parseTime(counter.getTime());
    display.rate.innerText = parseBits(counter.getRate());
  }

  tapable.onmousedown = tapable.ontouchstart = function (event) {
    event.preventDefault();
    counter.tap();
    displayCounter();
  }

  tapable.ontouchend = function (event) {
    event.preventDefault();
  }

  control.reset.onclick = function () {
    counter.reset();
    displayCounter();
  }

  displayCounter();
}
