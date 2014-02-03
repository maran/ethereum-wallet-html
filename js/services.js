var services = angular.module("services", ["Ethereum"])

services.factory('configService', function($resource, $rootScope){

  var ConfigService = $resource('/api/configs/:hash', {}, {
     'query':  {method:'GET', isArray:false},
  })

  ConfigService.query(function(e){
    $rootScope.config = e
  })

  return ConfigService
})

services.factory("alertService", function($rootScope){
  var alertService = {}
  $rootScope.alerts = []

  alertService.add = function(type, message) {
    var i = $rootScope.alerts.push({type: type, msg: message});
    setTimeout(function(){ 
      $rootScope.closeAlert(i-1) 
    }, 3000)
  };

  $rootScope.closeAlert = function(index) {
    $rootScope.alerts.splice(index, 1);
  };
  return alertService
})

services.factory("transactionService", ["$rootScope","Transaction", function($rootScope, Transaction){
  Transaction.query(function(e) {
    $rootScope.transactions = e
  })
}])

services.factory("templateService", ["$rootScope", function($rootScope){
  $rootScope.template = "dashboard"
}])
