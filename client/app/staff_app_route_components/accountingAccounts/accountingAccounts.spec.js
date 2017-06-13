import AccountingAccountsModule from './accountingAccounts'
import AccountingAccountsController from './accountingAccounts.controller';
import AccountingAccountsComponent from './accountingAccounts.component';
import AccountingAccountsTemplate from './accountingAccounts.html';

describe('AccountingAccounts', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingAccountsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingAccountsController();
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
      expect(AccountingAccountsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingAccountsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingAccountsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingAccountsController);
      });
  });
});
