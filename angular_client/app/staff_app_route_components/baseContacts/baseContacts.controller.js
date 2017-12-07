class BaseContactsController {
   /* @ngInject */
  constructor($timeout, $firebaseArray, Site, moment ) {
    var ctrl = this;
        ctrl.$onInit = onInit
        ctrl.filterList = filterList
        ctrl.toggleFilter = toggleFilter
        ctrl.active_filters = {};
        ctrl.filters ={}
        ctrl.filter_active = false;
        ctrl.addContactDialog = addContactDialog
        ctrl.editContactDialog = editContactDialog
        ctrl.now = new Date().getTime() *1000

        var Ref = firebase.database().ref('/crm/')
           ctrl.contacts =$firebaseArray(Ref)


        function onInit(){
          //create list of filters

          ctrl.filters['alumni_school_all' ] = {name:'All School Alumni', rules:{"var":["alumni.school"]}  }


          ctrl.filters['alumni_school_year_2014' ] = { name:'All School Year 2014', rules:{"var":["alumni.school.2014"]} }
          ctrl.filters['alumni_school_year_2015' ] = { name:'All School Year 2015', rules:{"var":["alumni.school.2015"]} }
          ctrl.filters['alumni_school_year_2016' ] = { name:'All School Year 2016', rules:{"var":["alumni.school.2016"]}  }
          ctrl.filters['alumni_school_year_2017' ] = { name:'All School Year 2017', rules:{"var":["alumni.school.2017"]}  }
          ctrl.filters['alumni_staff_all' ] = {name:'All Staff Alumni', rules:{"var":["alumni.staff"]}  }

          ctrl.filters['support_ministry_last_30days' ] = {name:'Supported A Ministry Last 30 days', 
                                                        rules:{">":[{"var":"last.ministry_support"}, {"-":[{"var":"ctrl.now"}, "2592000000" ]}] }  }
          ctrl.filters['support_staff_last_30days' ] = {name:'Supported A Staff member Last 30 days', 
                                                        rules:{"var":"last.staff_support"}}
                                                        //rules:{">":[{"var":"last.staff_support"}, {"-":[{"var":"ctrl.now"}, "2.592e+6" ]}] }  }

                                                          console.log(ctrl.now)
        
        }   


            function filterList(item){
              var show = false;
          
            // if(Object.keys(ctrl.filters).length<1)
            //   show = true;
            // else{
               for (var key in ctrl.filters) {
                var filter = ctrl.filters[key]
                if(filter.active){ 
               
                if(jsonLogic.apply(filter.rules, item))
                  show = true

                



               }//end if filter is active
              
            }  

        
       
          //show =  true;
         
          return show;
        }; 


        function toggleFilter(obj){
   
          
          // if(obj.active)

          var key =  JSON.stringify(obj);
          if(ctrl.active_filters[key])
            delete  ctrl.active_filters[key] 
          else
           ctrl.active_filters[key] =obj          
        
        }  

        function addContactDialog($event){
          var template =`<contact-management-edit-form ></contact-management-edit-form>`;
          Site.showDialog($event, template )

        }
        function editContactDialog($event, contact_id){
          var template =`<contact-management-edit-form contact-id="${contact_id}"></contact-management-edit-form>`;
          Site.showDialog($event, template )

        }

  }
}

export default BaseContactsController;
