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

  $scope.add = function (){
    $scope.addInstance=$uibModal.open({
      templateUrl:"add.html",
      controller:"AddInstanceCtrl",
      scope:$scope
      
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
app.controller('AddInstanceCtrl',function($scope){
  console.log("1");
  $scope.firstName;
  console.log("2");
  $scope.lastName;
  console.log("3");
  $scope.hobby;
  console.log("4");
  $scope.id;
  console.log("5");
  

  $scope.exit = function(){
    $scope.addInstance.close();
  }

  $scope.ok =function() {
    newVar = {
      "id":$scope.id,
      "first_name":$scope.firstName,
      "last_name":$scope.lastName,
      "hobby":$scope.hobby
    }
    $scope.newID=$scope.searchIndex($scope.id);
console.log("newID");
    if ($scope.newID==-1){
      console.log("138");
      $scope.users.push(newVar);
      console.log("140");
      $scope.addInstance.close();
    } 
    else {

      $scope.msg = 'duplicate id';
  }
  
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

