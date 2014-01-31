var ethereum = angular.module('Ethereum', ['ngResource', 'ui.bootstrap', "controllers", "services"])

/* http://kirkbushell.me/angular-js-using-ng-resource-in-a-more-restful-manner/ */

ethereum.factory('Transaction', function($resource){
  var TransactionService = $resource('/api/transactions/:hash', {}, {
  })

  return TransactionService
})

// Refactor to scoped controller
var ModalInstanceCtrl = function($scope, $modalInstance, transaction){
  $scope.transaction = transaction

  $scope.ok= function () {
    $modalInstance.dismiss('Ok');
  };
}

ethereum.filter('truncate', function () {
  return function (text, length, end) {
    if (isNaN(length)){ 
      length = 10
    }

    if (end === undefined){
      end = "..."
    }

    if (text.length <= length || text.length - end.length <= length) {
      return text
    }else {
      return String(text).substring(0, length-end.length) + end
    }

}})


