class AppStatusController {

  constructor() {
      var ctrl = this;

          ctrl.changeStatus = changeStatus

          //var 

          function changeStatus(status_num){

            console.log(ctrl.data)
           firebase.database().ref('applications').child(ctrl.data.$id).child('meta/status').set(status_num);

          }

  }
}

export default AppStatusController;
