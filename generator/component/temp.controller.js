class <%= upCaseName %>Controller {
   /* @ngInject */
  constructor() {
    var ctrl = this;
        
        ctrl.name = '<%= name %>';

        //var Ref = firebase.database().ref('/')
        // Ref.on('value',function(snap){
        //   ctrl.<%= name %> = snap.val()
        // })
  }
}

export default <%= upCaseName %>Controller;
