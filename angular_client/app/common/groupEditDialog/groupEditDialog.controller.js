class GroupEditDialogController {
   /* @ngInject */
  constructor(Site) {
    var ctrl = this;
        ctrl.save = save;
        ctrl.delete = deleteGroup
        ctrl.addEmail = addEmail
        ctrl.removeEmail = removeEmail
        ctrl.addFund = addFund
        ctrl.removeFund = removeFund
        ctrl.$onInit = onInit
        ctrl.site = Site

        

        var Ref = firebase.database().ref('/location/staff_groups')
       
        function onInit(){
        if(ctrl.groupId){
        Ref.child(ctrl.groupId).on('value',function(snap){
          ctrl.group = snap.val()
        })
        
        //get list of funds 
        firebase.database().ref('/funds').orderByChild('meta/type').equalTo('ministry').once('value',function(snap){
          ctrl.funds = snap.val()
        })

        }
        } 

      

       function save(){
        if(ctrl.groupId){
          Ref.child(ctrl.groupId).update(ctrl.group)
       }
      if(!ctrl.groupId){
         Ref.push(ctrl.group)
      }
        
         Site.hideDialog()
      }

      function deleteGroup(){
        Ref.child(ctrl.groupId).remove()
        Site.hideDialog()
      }  

      function addEmail(){
        Ref.child(ctrl.groupId+'/emails').push(ctrl.new_email).then((snap)=>{
          ctrl.new_email = null;
        })
      }
      function removeEmail(id){
        Ref.child(ctrl.groupId+'/emails/'+id).remove()
      }

      function addFund(){
        Ref.child(ctrl.groupId+'/funds').push(ctrl.new_fund).then((snap)=>{
          ctrl.new_fund = null;
        })
      }
      function removeFund(id){
        Ref.child(ctrl.groupId+'/funds/'+id).remove()
      }

  }
}

export default GroupEditDialogController;
