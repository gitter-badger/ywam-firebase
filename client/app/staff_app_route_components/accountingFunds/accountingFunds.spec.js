import AccountingFundsModule from './accountingFunds'
import AccountingFundsController from './accountingFunds.controller';
import AccountingFundsComponent from './accountingFunds.component';
import AccountingFundsTemplate from './accountingFunds.html';

describe('AccountingFunds', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingFundsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingFundsController();
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
      expect(AccountingFundsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingFundsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingFundsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingFundsController);
      });
  });
});
