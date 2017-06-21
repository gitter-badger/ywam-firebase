import AccountingAccountsViewModule from './accountingAccountsView'
import AccountingAccountsViewController from './accountingAccountsView.controller';
import AccountingAccountsViewComponent from './accountingAccountsView.component';
import AccountingAccountsViewTemplate from './accountingAccountsView.html';

describe('AccountingAccountsView', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingAccountsViewModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingAccountsViewController();
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
      expect(AccountingAccountsViewTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingAccountsViewComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingAccountsViewTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingAccountsViewController);
      });
  });
});
