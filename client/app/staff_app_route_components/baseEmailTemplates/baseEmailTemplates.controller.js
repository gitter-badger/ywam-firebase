class BaseEmailTemplatesController {
   /* @ngInject */
  constructor($firebaseObject,$compile,$timeout, $scope ) {
    
        var ctrl = this;
        var baseEmailTemplates = firebase.database().ref('location').child('email_templates/default')
        baseEmailTemplates.on('value', function(snap){
            var template = '<div style="color:red"> This is a handle<div style="color:red"> bar</div> <br> {{content}} </div>'//snap.val()

            console.log(template)
            $scope.content ='hello'
            var parsedTemplate = $compile(template)($scope); // at this point, the template isn't processed yet
            console.log(parsedTemplate)
          //timeout in order to get the template processed
          $timeout(function() {
            ctrl.template = parsedTemplate.prop('innerHTML');
            console.log(ctrl.template)
          })
           
            
        })
      
        //ctrl.templates =  $firebaseObject(baseEmailTemplates)

        
        
  }
}

export default BaseEmailTemplatesController;
