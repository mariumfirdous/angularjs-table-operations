var app = angular.module('angularTable', ['angularUtils.directives.dirPagination', 'ui.bootstrap']);

app.controller('listdata',function($scope, $uibModal){
  $scope.users = [  
    {  
       "id":1,
       "first_name":"Heather",
       "last_name":"Bell",
       "hobby":"Eating"
    },
    {  
       "id":2,
       "first_name":"Andrea",
       "last_name":"Dean",
       "hobby":"Gaming"
    },
    {  
       "id":3,
       "first_name":"Peter",
       "last_name":"Barnes",
       "hobby":"Reading Books"
    },
    {  
       "id":4,
       "first_name":"Harry",
       "last_name":"Bell",
       "hobby":"Youtubing"
    },
    {  
       "id":5,
       "first_name":"Deborah",
       "last_name":"Burns",
       "hobby":"Fishing"
    },
    {  
       "id":6,
       "first_name":"Larry",
       "last_name":"Kim",
       "hobby":"Skipping"
    },
    {  
       "id":7,
       "first_name":"Jason",
       "last_name":"Wallace",
       "hobby":"Football"
    }
 ] //declare an empty array
  // $http.get("mock.json").success(function(response){ 
  //     $scope.users = response;  //ajax request to fetch data into $scope.data
  // });

  $scope.deleteIndex = -1;
  $scope.deleteUser;

  $scope.delete = function(id) {
    $scope.deleteIndex = $scope.searchIndex(id);
    $scope.deleteUser = $scope.users[$scope.deleteIndex];

    $scope.modalInstance = $uibModal.open({
        templateUrl: 'modal.html',
        controller: 'ModalInstanceCtrl',
        scope: $scope
    });
  }
  $scope.edit = function (id) {
    $scope.editIndex = $scope.searchIndex(id);
    $scope.editInstance = $uibModal.open({
    templateUrl:"edit.html",
    controller: "EditInstanceCtrl",
    scope: $scope

    });
  }

  $scope.searchIndex = function(id){
    for(i=0;i<$scope.users.length;i++){
      if(id==$scope.users[i].id){
        return i;
      }
    }
    return -1;
  }

});
app.controller('EditInstanceCtrl',function($scope){
  $scope.firstName = $scope.users[$scope.editIndex].first_name;
  $scope.lastName = $scope.users[$scope.editIndex].last_name;
  $scope.hobby = $scope.users[$scope.editIndex].hobby;

  $scope.exit = function(){
    $scope.editInstance.close();
  }

  $scope.ok =function() {
    console.log($scope.deleteIndex);
    $scope.users[$scope.editIndex].first_name = $scope.firstName;
    $scope.users[$scope.editIndex].last_name = $scope.lastName;
    $scope.users[$scope.editIndex].hobby=$scope.hobby;

    $scope.editInstance.close();
  }
});

app.controller('ModalInstanceCtrl', function ($scope) {

  $scope.exit = function(){
     $scope.modalInstance.close();
  }

  $scope.ok = function() {

    console.log($scope.deleteIndex);
    $scope.users.splice($scope.deleteIndex, 1);
    $scope.deleteUser = undefined;

    $scope.modalInstance.close();
  }

});

