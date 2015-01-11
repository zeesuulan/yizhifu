'use strict';

describe('Controller: InfoLogqueryCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var InfoLogqueryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoLogqueryCtrl = $controller('InfoLogqueryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
