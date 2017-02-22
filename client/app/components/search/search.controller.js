class SearchController {
   /* @ngInject */
  constructor(Site, $timeout, $firebaseObject, $filter, $scope) {
     var ctrl = this;
         ctrl.site = Site;
       
         
         ctrl.$onInit = function(){
               if(!Site.searchString)
                   Site.searchString="" 

           $scope.$watch('$ctrl.site.searchString', function() {
               ctrl.goSearch()
            });

         }

          ctrl.results = []

    var SearchRef = firebase.database().ref('search');


    ctrl.goSearch =  debounce( function(){
      
     if(Site.searchString.length>0){

        var string = Site.searchString.replace(/[/[\]'.]/g, "").toLowerCase()

        console.log(string)
       if(string){ 
           ctrl.searching = true;
             SearchRef.child('requests').child(string).set(true)
              SearchRef.child('requests').child(string).on('value',function(snap){
                  if(snap.val()==null){
                      snap.ref.off()
                 ctrl.searching = false;
                  }
                 
              })
      
      var ref = firebase.database().ref('search/results').child(string)
        .on('value',  function fn(snap) { 
           
           if( snap.val() !== null ) {     // wait for data
             snap.ref.off('value', fn); // stop listening
            //  snap.ref.remove();         // clear the queue
             snap.forEach(function(snapshot){
               var data = snapshot.val()
                data.id = snapshot.key
             
                    var filter =  $filter('filter')(ctrl.results, {id: data.id}, true);
           var index = ctrl.results.indexOf(filter[0])
            
            if(index == -1){
              ctrl.results.push(data);
              Site.getAvatar(snapshot.key)
            }
             
             })

           
           

          }
        //     // TODO remove previous listeners
        //     var data = snapshot.val()
        //         data.id = snapshot.key
          
        //    var filter =  $filter('filter')(ctrl.results, {id: data.id}, true);
        //    var index = ctrl.results.indexOf(filter[0])
            
        //     if(index == -1){
        //       ctrl.results.push(data);
        //       Site.getAvatar(snapshot.key)
        //     }
             
        });

     
       }//if string


      //  var reqRef = queue.child('request').push({ index: "users", type: "A", query: Site.searchString });

      //  // read the replies from https://<INSTANCE>.firebaseio.com/search/response
      //  queue.child('response/'+reqRef.key).on('value', function fn(snap) {
      //     if( snap.val() !== null ) {     // wait for data
      //        snap.ref.off('value', fn); // stop listening
      //        snap.ref.remove();         // clear the queue
      //        $timeout(function(){ 
      //        ctrl.results = snap.val();


      //        },500)
      //        console.log(snap.val()) 

      //     }
      //  });
    
     }//if Site.searchString
      else {
        //also clear the list ..keeps it from getting too long from repeated searches 
      ctrl.results = []
      console.log('clearing results list')
      }

  }, 250, false)



function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};



  }
}

export default SearchController;
