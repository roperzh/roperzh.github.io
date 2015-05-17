// -------------------------------------------
//   Loading Bar
// -------------------------------------------

Roperzh.Behaviors.LoadingBar = Essential.Behavior.extend({
  channels: {
    'loadingBar:show': 'show',
    'loadingBar:hide': 'hide'
  },

  show: function() {
    this.el.classList.add('animating');
  },

  hide: function() {
    this.el.classList.remove('animating');
  }
});
