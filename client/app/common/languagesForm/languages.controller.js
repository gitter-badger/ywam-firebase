class LanguagesController {
   /* @ngInject */
  constructor(Auth, $firebaseObject, $scope, $timeout) {
   var ctrl = this;
   var user_id = Auth.$getAuth().uid
       ctrl.removeLang = removeLang;
       ctrl.addLang = addLang

            $scope.$watch('$ctrl.LangForm.$valid',function(v){
               $timeout(function(){
                  ctrl.isValid = ctrl.LangForm.$valid
               })
               
            })


   var profile_language_ref =   firebase.database().ref('/profiles/' +user_id+'/basic/languages' );
         $firebaseObject(profile_language_ref).$bindTo($scope, "user_lang");


        firebase.database().ref('languages').once('value',snap=>{
          ctrl.languages = snap.val()
        })


     function removeLang(key){
       profile_language_ref.child(key).remove()
      }  

      function addLang(key){
       firebase.database().ref('/profiles/' +user_id+'/basic/languages' ).child(key).set(false)
      } 

  }
}

export default LanguagesController;
