// *************************************
//   JS Manifest
// *************************************

document.addEventListener('DOMContentLoaded', function() {

  page('/', function(ctx) {
    Roperzh.Services.loadPage(ctx);
  });

  page('/:slug', function(ctx) {
    Roperzh.Services.loadPage(ctx);
  });

  page({
    dispatch: false
  });

  /* Remove the 300ms delay between a physical tap and the firing
     of a click event on mobile browsers */
  FastClick.attach(document.body);

  /* Load an initialize all the behaviors */
  Essential.loadBehaviors({
    context: document,
    application: window.Roperzh.Behaviors
  });

});
