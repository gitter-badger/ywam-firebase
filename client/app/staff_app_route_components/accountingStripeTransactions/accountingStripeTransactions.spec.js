import AccountingStripeTransactionsModule from './accountingStripeTransactions'
import AccountingStripeTransactionsController from './accountingStripeTransactions.controller';
import AccountingStripeTransactionsComponent from './accountingStripeTransactions.component';
import AccountingStripeTransactionsTemplate from './accountingStripeTransactions.html';

describe('AccountingStripeTransactions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingStripeTransactionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingStripeTransactionsController();
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
      expect(AccountingStripeTransactionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingStripeTransactionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingStripeTransactionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingStripeTransactionsController);
      });
  });
});
