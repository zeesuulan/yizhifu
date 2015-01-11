'use strict';

describe('Controller: InfoLedgerqueryCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var InfoLedgerqueryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoLedgerqueryCtrl = $controller('InfoLedgerqueryCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
