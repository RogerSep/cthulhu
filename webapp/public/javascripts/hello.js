angular.module("app", ["ui.router"])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("start", {
        url: "/",
        templateUrl: "/assets/partials/start.html"
      });
  })
  .filter("markdown", function ($sce) {
    var md = new Remarkable('full', {
      html: false,
      xhtmlOut: false,
      breaks: false,
      langPrefix: 'language-',
      linkify: true,
      typographer: false,
      quotes: '“”‘’'
    });

    return function (input) {
      return $sce.trustAsHtml(md.render(input));
    };
  })