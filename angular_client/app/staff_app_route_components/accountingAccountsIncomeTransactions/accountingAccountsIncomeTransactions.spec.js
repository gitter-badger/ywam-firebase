import AccountingAccountsIncomeTransactionsModule from './accountingAccountsIncomeTransactions'
import AccountingAccountsIncomeTransactionsController from './accountingAccountsIncomeTransactions.controller';
import AccountingAccountsIncomeTransactionsComponent from './accountingAccountsIncomeTransactions.component';
import AccountingAccountsIncomeTransactionsTemplate from './accountingAccountsIncomeTransactions.html';

describe('AccountingAccountsIncomeTransactions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingAccountsIncomeTransactionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingAccountsIncomeTransactionsController();
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
      expect(AccountingAccountsIncomeTransactionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingAccountsIncomeTransactionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingAccountsIncomeTransactionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingAccountsIncomeTransactionsController);
      });
  });
});
