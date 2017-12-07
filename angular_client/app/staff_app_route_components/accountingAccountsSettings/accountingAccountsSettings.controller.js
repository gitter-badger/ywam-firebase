class AccountingAccountsSettingsController {
   /* @ngInject */
  constructor($firebaseObject, $stateParams, $scope) {
    var ctrl = this;
        ctrl.newKeywordIncome = newKeywordIncome
        ctrl.removeKeywordIncome =removeKeywordIncome
        ctrl.newKeywordExpense = newKeywordExpense
        ctrl.removeKeywordExpense =removeKeywordExpense
        

        var Settings = firebase.database().ref('/finance_accounts/'+$stateParams.account_id+'/settings')
         $firebaseObject(Settings).$bindTo($scope, "$ctrl.settings");
        

        function newKeywordIncome(){
          Settings.child('hide_keywords_income').push(ctrl.hide_keyword_income)
          ctrl.hide_keyword_income =''
        }
        function removeKeywordIncome(key){
          Settings.child('hide_keywords_income/'+key).remove()
        }
        function newKeywordExpense(){
          Settings.child('hide_keywords_expense').push(ctrl.hide_keyword_expense)
          ctrl.hide_keyword_expense =''
        }
        function removeKeywordExpense(key){
          Settings.child('hide_keywords_expense/'+key).remove()
        }
  }
}

export default AccountingAccountsSettingsController;
