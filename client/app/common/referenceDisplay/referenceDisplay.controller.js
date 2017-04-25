class ReferenceDisplayController {
    /* @ngInject */
    constructor($mdDialog,$mdMedia,$stateParams,$scope, $state) {
        
        var ctrl = this;
        ctrl.editRefernceRequestDialog=editRefernceRequestDialog;  

        ctrl.$onInit = ()=>{
            console.log(ctrl.key);
            var refRef = firebase.database().ref('applications/'+ctrl.key)
            refRef.on('value',function(snap){
                ctrl.id = snap.key.replace(/\D/g,'')
                if(snap.val())
                {
                    ctrl.reference = snap.val()
                    ctrl.form =  ctrl.reference.form
                }
            })
        }


        function editRefernceRequestDialog($event) {          
            var parentEl = angular.element(document.body);
            $mdDialog.show({
                parent: parentEl,
                targetEvent: $event,
                clickOutsideToClose:true,
                fullscreen: $mdMedia('xs'),
                template:
                '<md-dialog aria-label="dialog">'+
                '   <md-dialog-content style="padding:15px">'+
                '       <ref-request ng-if="app_id" app-id="app_id" is-valid="true"></ref-request>'+
                '   </md-dialog-content>'+
                '   <md-dialog-actions>' +
                '       <md-button ng-click="closeDialog()" class="md-primary">' +
                '           Close Dialog'+
                '       </md-button>'+
                '   </md-dialog-actions>'+
                '</md-dialog>',
                locals: {
                    app_id: $scope.app_id
                },
                controller: function ($scope, $mdDialog) {
                    $scope.closeDialog = function() {
                        $mdDialog.hide();
                    }; 
                    $scope.app_id=$stateParams.app_id; 
                }
            });
        }  

    }
}

export default ReferenceDisplayController;
