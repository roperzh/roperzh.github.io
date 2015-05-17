// -------------------------------------------
//   Font Loader
// -------------------------------------------

Roperzh.Behaviors.FontLoader = Essential.Behavior.extend({
  init: function() {
    var fontBase = new FontFaceObserver('Montserrat', {
      weight: 400
    });

    Promise.all([
      fontBase.check(),
    ]).then(function() {
      document.documentElement.className += ' fonts-loaded';
    }, function() {
      document.documentElement.className += ' fonts-unavailable';
    });
  }
});
