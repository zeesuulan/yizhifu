'use strict';

describe('Controller: InfoSettlmentCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var InfoSettlmentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoSettlmentCtrl = $controller('InfoSettlmentCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
