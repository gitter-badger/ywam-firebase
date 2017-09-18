class SidenavController {
  /* @ngInject */
  constructor($state,$mdMedia,$mdSidenav, Site,$rootScope,$filter ) {
   
   
   var ctrl = this;
     ctrl.sideBarNav = sideBarNav;
     ctrl.site = Site
     ctrl.$state = $state;
     ctrl.goSearch = goSearch
     
     function goSearch(){

       $state.go('search')
     }

    

    

    //define navigation menu
   ctrl.nav = [

    {title: 'Schools',
    state: 'schools',
    fa_icon:'fa fa-star'},
    
     {title: 'Staff',
    state: 'staff.current',
    fa_icon:'fa fa-tree',
    },
    {title: 'Groups',
    state: 'staffGroups',
    fa_icon:'fa fa-users'},     

    {title: 'Accounting',
              state: 'accounting.funds',
              fa_icon:'fa fa-usd'},

    {title: 'All Base Contacts',
    state: 'baseContacts',
    fa_icon:'fa fa-address-book-o'},

    {title: 'Donors',
    state: 'donors',
    fa_icon:'fa fa-heart-o'},          

    {title: 'Base Info',
    state: 'base.info',
    fa_icon:'fa fa-home'},
   
    //sub_nav:[
              // {title: 'Rides',
              // state: 'base.rides',
              // fa_icon:'fa fa-car'},

              

              // {title: 'Signup Lists',
              //   state: 'base.signup',
              //   fa_icon:'fa fa-pencil-square-o'},

              // {title: 'Logistic Teams',
              //   state: 'base.groups',
              //   fa_icon:'fa-share-alt'},
            //  ]},
    // {title: 'Arrival / Departure',
    //  state: 'app.base.travel',
    //  fa_icon:'icon-plane'},

    // {title: 'Shuttles',
    //  state: 'app.base.shuttles',
    //  fa_icon:' fa fa-bus'},

   
   

    

    
    // {title: 'Nations',
    // state: 'app.nations',
    // fa_icon:'icon-globe'},

    // {title: 'Projects',
    // state: 'projects',
    // fa_icon:'fa fa-star-o'},

    //   {title: 'Updates',
    // state: 'app.dashboard',
    // fa_icon:'icon-feed'},
    
    {title: 'Prayer Wall',
    state: 'prayer',
    fa_icon:'fa fa-bolt'}, 

  

    // {title: 'Budget System',
    // state: 'app.finance',
    // fa_icon:'fa fa-usd',

    // sub_nav: [  
    //           {title: 'Budget Planner',
    //           state: 'finance.budget',
    //           fa_icon:'icon-calculator'},
    //           {title: 'Team',
    //           state: 'finance.team',
    //           fa_icon:'icon-users'},
    //           {title: 'Accounts',
    //           state: 'finance.accounts',
    //           fa_icon:'icon-briefcase'},
    //           ]
            // }, 

    // {title: 'Profile',
    // state: 'app.user.profile',
    // fa_icon:'fa fa-user'}, 

      {title: 'Translation',
    state: 'translation',
    fa_icon:'fa fa-language'}, 

   

     {title: 'In Development',
    // state: 'app.finance',
    fa_icon:'fa fa-flask',

    sub_nav: [  
              
             {title: 'Projects',
              state: 'projects',
              fa_icon:'fa fa-star-o'},
               {title: 'Server Tasks',
              state: 'settings',
              fa_icon:'fa fa-server'},
              {title: 'Site Stats',
              state: 'siteStats',
              fa_icon:'fa fa-server'},
              
              {title: 'BrainTree',
              state: 'accountingBrainTree',
              fa_icon:'fa fa-tree'},
              ]
            }, 


]
  $rootScope.$on('$viewContentLoaded',function(){
         ctrl.current = $state.current.name
      
         var nav =  $filter('filter')(ctrl.nav, {state: ctrl.current}, true);
         var index = ctrl.nav.indexOf(nav[0])
      if(ctrl.nav[index])
       ctrl.nav[index].active = true
       //console.log(ctrl.nav[index])
      })

//little function to do the navigation from sidebar clicks, it will take care of closing the sidebar on mobile.
    function sideBarNav(navItem){

console.log('here we go!', navItem)
       

        var itemIndex = ctrl.nav.indexOf(navItem);//get index of our item
        
        // console.log(itemIndex);
        
        if(itemIndex>0){//little check to see if this is a subnav item
        angular.forEach(ctrl.nav, function(item, key){
            //here set our item to be active if it is not already true.
            //and deactivate all other items 
            //and if it is already true with deactivate it (someone clicked to collapse the item)
            key == itemIndex && !item.active ? item.active =true :item.active = false ;
        }); 
         }else{//else we are dealing with a subnav
           
           //find the nav menue that is active and set all other subnav items to be non active 
            angular.forEach(ctrl.nav, function(item, key){
            if(item.active){
                 angular.forEach(item.sub_nav, function(item, key){
                  item.active = false;
                 })//endfor each sub nav
             }//end if item is active
            }); //end for each nav item
            
             //but set our sub_nav item to be active :-)
              navItem.active = true;
         }
        	
        //On small devices we close the side bar .. if the item doesn't have more sub items.. so they can navigate further. 
        if(!$mdMedia('gt-md') && !navItem.sub_nav)
        $mdSidenav('left').close();


 $state.go(navItem.state);//tell the router where we want to go. 
     }  

  }
}

export default SidenavController;
