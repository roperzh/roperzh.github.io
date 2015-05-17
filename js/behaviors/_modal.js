// -------------------------------------------
//   Modal
// -------------------------------------------

Roperzh.Behaviors.Modal = Essential.Behavior.extend({
  init: function() {
    this.main = document.querySelector('main[role="main"]');
    this.el.innerHTML += '<div class="overlay"></div>';
    this.el.style.display = 'none';
  },

  events: {
    'click': 'close'
  },

  channels: {
    'modal:open': 'open',
    'modal:close': 'close'
  },

  open: function() {
    this.setOverflow('hidden');
    this.el.style.display = 'block';

    setTimeout(function() {
      this.el.classList.add('open');
      this.emit({ channel: 'modal:opened' });
    }.bind(this));

  },

  close: function() {
    this.setOverflow('initial');
    this.el.classList.remove('open');
    this.emit({ channel: 'modal:closed' });

    setTimeout(function() {
      this.el.style.display = 'none';
    }.bind(this), 500);
  },

  setOverflow: function(style) {
    document.documentElement.style.overflow = style;
    document.body.style.overflow = style;
  }
});
