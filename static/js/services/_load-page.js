// -------------------------------------------
//   Load Page
// -------------------------------------------

Roperzh.Services.loadPage = function(ctx) {
  var main = document.querySelector('main[role="main"]');
  main.style.opacity = 0;

  Essential.Behavior.emit({
    context: document,
    channel: "loadingBar:show"
  });

  fetch(ctx.path).then(function(response) {
    response.text().then(function(rawText) {
      var auxElement = document.createElement('html');
      auxElement.innerHTML = rawText;

      setTimeout(function() {
        Essential.Behavior.emit({
          context: document,
          channel: "loadingBar:hide"
        });

        main.innerHTML = auxElement.querySelector('main[role="main"]').innerHTML;
        main.style.opacity = 1;
        grunticon.svgLoadedCallback();

        Essential.loadBehaviors({
          context: main,
          application: Roperzh.Behaviors
        })
      }, 1000);
    });
  });

};
