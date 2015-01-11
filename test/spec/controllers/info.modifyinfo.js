'use strict';

describe('Controller: InfoModifyinfoCtrl', function () {

  // load the controller's module
  beforeEach(module('yizhifuApp'));

  var InfoModifyinfoCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InfoModifyinfoCtrl = $controller('InfoModifyinfoCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
