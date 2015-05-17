// -------------------------------------------
//   Modal Trigger
// -------------------------------------------

Roperzh.Behaviors.ModalTrigger = Essential.Behavior.extend({
  events: {
    'click': 'toggleModal'
  },

  channels: {
    'modal:closed': 'animate',
    'modal:opened': 'animate'
  },

  toggleModal: function(e) {
    var channel = this.el.classList.contains('active') ? 'modal:close' : 'modal:open';
    this.emit({ channel: channel });
    e.preventDefault();
  },

  animate: function() {
    this.el.classList.toggle('active');
  }
});
