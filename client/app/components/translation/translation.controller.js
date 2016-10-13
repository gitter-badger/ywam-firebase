class TranslationController {
   /* @ngInject */
  constructor($firebaseObject,$firebaseArray,  $timeout,$stateParams) {
      

      
       var ctrl = this;
        ctrl.phrases = {};
        ctrl.sections = {}
     

       var ref = firebase.database().ref('phrases');

       ref.on('child_added', function(snapshot) { 
            
            ctrl.sections[snapshot.key] = snapshot.val()
            countPhrases(snapshot)

             $timeout(function() {}  )
         
      });// end on child added 


             ref.on('child_changed', function(snapshot) { 
            
            countPhrases(snapshot)

            $timeout(function() {}  )
         
      });// end on child added 


function countPhrases(snapshot){
  
   angular.forEach(snapshot.val(), function(value, key){

              if(key != 'meta')
              ctrl.sections[snapshot.key][key].$count =  Object.keys(value).length

            })

}




  }
}

export default TranslationController;
