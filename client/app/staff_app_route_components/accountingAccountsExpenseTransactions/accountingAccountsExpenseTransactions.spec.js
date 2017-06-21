import AccountingAccountsExpenseTransactionsModule from './accountingAccountsExpenseTransactions'
import AccountingAccountsExpenseTransactionsController from './accountingAccountsExpenseTransactions.controller';
import AccountingAccountsExpenseTransactionsComponent from './accountingAccountsExpenseTransactions.component';
import AccountingAccountsExpenseTransactionsTemplate from './accountingAccountsExpenseTransactions.html';

describe('AccountingAccountsExpenseTransactions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingAccountsExpenseTransactionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingAccountsExpenseTransactionsController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(AccountingAccountsExpenseTransactionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingAccountsExpenseTransactionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingAccountsExpenseTransactionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingAccountsExpenseTransactionsController);
      });
  });
});
