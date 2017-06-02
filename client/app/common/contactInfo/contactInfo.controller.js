class ContactInfoController 
{
    /* @ngInject */
    constructor($firebaseObject,Site) 
    {
        var ctrl = this
        ctrl.editContactInfoDialog = editContactInfoDialog
        ctrl.editEmergencyDialog = editEmergencyDialog

        ctrl.$onInit = function() 
        {
            var userRef = firebase.database().ref('profiles').child(ctrl.userId)
            ctrl.contact= $firebaseObject(userRef.child('contact'))
            ctrl.em_contact= $firebaseObject(userRef.child('emergency_contact'))
            ctrl.postal= $firebaseObject(userRef.child('postal'))

        }//end on init

        function editContactInfoDialog($event) 
        {
            var template= '<contact-info-form user-id="'+ctrl.userId+'"></contact-info-form>'           
            Site.showDialog($event, template, 'save_changes' )
        } 

        function editEmergencyDialog($event) 
        {
            console.log(ctrl.userId)
            var template= '<emergency-contact user-id="'+ctrl.userId+'"></emergency-contact>'
            Site.showDialog($event, template, 'save_changes' )
        }  
    }
}

export default ContactInfoController;
