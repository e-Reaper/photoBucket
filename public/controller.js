var bucket = angular.module('bucket',['naif.base64']);  // create new module and include base64 converter library

bucket.controller('bucketController',function($scope, $http ) {  // create controller
	
	$scope.error = false;   // initially no errors in uploading image    
	console.log("controller initiated");
	
	var refresh = function() {
	  $http.get('/photos').success(function(response) {
		
		console.log("got the data");
		
		$scope.imagelist = [];
		
		
		response.forEach(function(row){ // for each row of data returned by server .
			if(row.photo){
				//console.log(row);
				var temp = {};  // create temporary object to save id , image , label
				temp.id = row._id;
				temp.photo = row.photo;
				temp.label = row.label;
				$scope.imagelist.push(temp);// add the temporary object into the list to display	
			
			}
		});
		
		
	  });
	};

	refresh(); // get all the data when page loads 
	$scope.addphoto = function(){ 
		
		if($scope.file.filesize<75000){  // if the file size approx less than 75KB
			
			bucket = {};
			bucket.photo = 	$scope.file.base64;  // encode the uploaded image file in base64
			bucket.label = $scope.label;
			$scope.label = '';
			//console.log($scope.file);
			//console.log(bucket.photo);
			$http.post('/addPhoto',bucket).success(function(response){ //send post request to add the photo
				//console.log(response);
				refresh(); // refresh the data to display 
			});
			$scope.error = false;  // no errors in uploading image
		
		}
		else{
			
			$scope.error = true; // show error in uploading image
			//console.log('filesize exceeded');
		
		}
		
		$scope.file = null;
	};

	
});