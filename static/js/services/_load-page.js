// -------------------------------------------
//   Load Page
// -------------------------------------------

Roperzh.Services.loadPage = function(ctx) {
  var main = document.querySelector('main[role="main"]');
  var startTime = new Date().getTime();

  main.style.opacity = 0;

  Essential.Behavior.emit({
    context: document,
    channel: "loadingBar:show"
  });

  fetch(ctx.path).then(function(response) {
    response.text().then(function(rawText) {
      var auxElement = document.createElement('html');
      var endTime;
      var timeSpent;

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
        });

        endTime = new Date().getTime();
        timeSpent = endTime - startTime;

        ga('send', 'pageview');
        ga('send', 'timing', 'PageChange', ctx.path, timeSpent);

      }, 1000);
    });
  });

};
