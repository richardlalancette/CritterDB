var publishBestiaryCtrl = function ($scope,$mdDialog,baseBestiary,Auth,PublishedBestiary,$location,Creature) {

	$scope.publishedBestiary = {
		'name': baseBestiary.name,
		'description': baseBestiary.description,
		'owner': Auth.user,
		'creatures': []				//define later upon creation
	};

	function goToPublishedBestiary(id){
		$location.url("/publishedbestiary/view/"+id);
	}

	$scope.publish = function(){
		Creature.getAllForBestiary(baseBestiary._id,function(data){
			$scope.publishedBestiary.creatures = data;
			PublishedBestiary.create($scope.publishedBestiary,function(data){
					goToPublishedBestiary(data._id);
					$mdDialog.cancel();
				},function(err){
					console.log("error: "+err);
				});
		});
	}

	$scope.cancel = function() {
    $mdDialog.cancel();
  };

};

angular.module('myApp').controller('publishBestiaryCtrl',publishBestiaryCtrl);
