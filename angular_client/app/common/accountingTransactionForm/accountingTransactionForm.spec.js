import AccountingTransactionFormModule from './accountingTransactionForm'
import AccountingTransactionFormController from './accountingTransactionForm.controller';
import AccountingTransactionFormComponent from './accountingTransactionForm.component';
import AccountingTransactionFormTemplate from './accountingTransactionForm.html';

describe('AccountingTransactionForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingTransactionFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingTransactionFormController();
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
      expect(AccountingTransactionFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingTransactionFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingTransactionFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingTransactionFormController);
      });
  });
});
