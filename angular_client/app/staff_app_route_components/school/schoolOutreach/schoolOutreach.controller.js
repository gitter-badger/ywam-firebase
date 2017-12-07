class SchoolOutreachController {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = 'schoolOutreach';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.schoolOutreach = snap.val()
        // })
  }
}

export default SchoolOutreachController;
