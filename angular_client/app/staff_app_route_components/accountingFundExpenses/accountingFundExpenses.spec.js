import AccountingFundExpensesModule from './accountingFundExpenses'
import AccountingFundExpensesController from './accountingFundExpenses.controller';
import AccountingFundExpensesComponent from './accountingFundExpenses.component';
import AccountingFundExpensesTemplate from './accountingFundExpenses.html';

describe('AccountingFundExpenses', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingFundExpensesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingFundExpensesController();
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
      expect(AccountingFundExpensesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingFundExpensesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingFundExpensesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingFundExpensesController);
      });
  });
});
