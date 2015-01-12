'use strict';

describe('Controller: InfoSettlementDetailCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var InfoSettlementDetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoSettlementDetailCtrl = $controller('InfoSettlementDetailCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
