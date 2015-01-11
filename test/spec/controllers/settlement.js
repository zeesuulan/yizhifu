'use strict';

describe('Controller: SettlementCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var SettlementCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SettlementCtrl = $controller('SettlementCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
