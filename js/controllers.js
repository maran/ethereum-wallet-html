var controllers = angular.module("controllers", ["Ethereum"])

controllers.controller("balanceCtrl", ["$scope","$rootScope", "configService", function($scope, $rootScope, configService){
}])

controllers.controller("mainCtrl", ["$scope", "templateService", function($scope, templateService){
  $scope.loadTemplate = function(template){
    $scope.template = template
  }
}])

controllers.controller("ListTransactionCtrl", ["$scope", "Transaction", "alertService","transactionService","configService", function($scope, Transaction, alertService, transactionService, configService){
}])

controllers.controller("NewTransactionCtrl", ["$scope","$modal", "Transaction","alertService","transactionService","configService", function($scope,$modal, Transaction, alertService, transactionService, configService) {
  $scope.transaction = new Transaction()

  $scope.createTx = function(){
    $scope.transaction.$save(function(t){
      if(t.Status == "1"){
        t.Sender = $scope.config.Account
        $scope.transactions.push(t)
        var modalInstance = $modal.open({
          templateUrl: 'transactionCreated.html',
          controller: ModalInstanceCtrl,
          resolve: {
            transaction: function () {
              return $scope.transaction;
            }
          }
        })
      }else if(t.Status == "0"){
        alertService.add("warning", t.ErrorText)
        $scope.transaction = new Transaction({recipient: t.Recipient, amount: t.Amount})
      }
    })
  }
}])
