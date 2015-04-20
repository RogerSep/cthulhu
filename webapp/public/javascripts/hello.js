angular.module("app", ["ui.router"])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("start", {
        url: "/",
        templateUrl: "/assets/partials/start.html",
        controller: "polloEditor"
      });
  })
  .controller("polloEditor", function ($scope) {
    $scope.pollos = [];
    $scope.activePollo = -1;

    $scope.activate = function activate(index) {
      $scope.activePollo = index;
    }

    $scope.addPollo = function addPollo(click) {
      $scope.pollo = {
        position: {
          x: click.x + "px",
          y: click.y + "px"
        },
        text: [
            "```",
            "Pollito!",
            "(°)>",
            "3 )",
            "^^",
            "```"
          ].join("\n")
      };
    };

    $scope.savePollo = function () {
      $scope.pollos.push($scope.pollo);
      $scope.pollo = null;
    }
  })
  .directive("pollito", function () {
    return {
      scope: {
        pollo: "="
      },
      replace: true,
      templateUrl: "/assets/partials/pollito.html",
      link: function () {
        console.log(arguments);
      }
    }
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