class BaseContactsController {
   /* @ngInject */
  constructor($timeout, $firebaseArray) {
    var ctrl = this;
        
        ctrl.name = 'baseContacts';
        ctrl.filterList = filterList
        ctrl.toggleFilter = toggleFilter
        ctrl.active_filters = {};
        ctrl.school_years = ['2014','2015','2016','2017'];//todo .. get this from looking at range of school start dates ? 
     

        var Ref = firebase.database().ref('/crm/')
           ctrl.contacts =$firebaseArray(Ref)

          //  Ref.once('value',function(snap){
          //   //look over what school years we have in the data
          //   snap.forEach(function(item){
          //     var data = item.val()

          //         if(data.alumni.school){

          //           ctrl.school_years.push()

          //         }
          //   })

          //  })
       


            function filterList(item){
              var show = false;
          
            if(Object.keys(ctrl.active_filters).length<1)
              show = true;
            else{
               for (var key in ctrl.active_filters) {
                var filter = ctrl.active_filters[key]
                 
                if(filter.name == 'alumni_school_all' && item.alumni)
                  show = true

                if(filter.name == 'alumni_school_year' && item.alumni && item.alumni.school[filter.year])
                  show = true 



               }
              
            }  

        
       
          //show =  true;
         
          return show;
        }; 


        function toggleFilter(obj){
   
          var key =  JSON.stringify(obj);
          if(ctrl.active_filters[key])
            delete  ctrl.active_filters[key] 
          else
           ctrl.active_filters[key] =obj          
        
        }  

  }
}

export default BaseContactsController;
