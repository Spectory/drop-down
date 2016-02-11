/*globals angular, R, multi */

angular.module('spectoplyApp').directive('dropDown', function ($document) {
  'use strict';

  return {
    restrict: 'E',
    scope: {
      options: '=',
      value: '=',
      valueProperty: '@',
      nameProperty: '@'
    },
    template:
              '<div class="dd-box" ng-class="hasOptions() ? \'openable\' : \'unopenable\'">' +
                '{{selected ? selected[nameProperty] : "Select"}}' +
                '<div class="arrow-down-container">' +
                  '<div class="icon arrow-down"></div>' +
                '</div>' +
              '</div>' +

              '<div class="options-container" ng-show="open.value">' +
                '<div class="option" ng-repeat="option in options" ng-click="select(option)">' +
                  '{{option[nameProperty]}}' +
                '</div>' +
              '</div>',
    link: function (scope, elem) {
      scope.open = { value: false };
      scope.selected = null;
      scope.valueProperty = scope.valueProperty || 'id';
      scope.nameProperty = scope.nameProperty || 'name';

      scope.select = function (option) {
        scope.selected = option;
        scope.value = scope.selected[scope.valueProperty];
      }

      scope.hasOptions = function () {
        return R.values(scope.options).length > 0;
      };

      $document.bind('click', function (event) {
        var children = elem.children(), i;

        for (i = 0; i < children.length; i++) {
          if (event.target === children[i] || children[i].contains(event.target))  {
            scope.open.value = !scope.open.value;
            scope.$apply();
            return;
          }
        }

        scope.open.value = false;
        scope.$apply();
      });
    }
  };
});