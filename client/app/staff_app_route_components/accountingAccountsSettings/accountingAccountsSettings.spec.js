import AccountingAccountsSettingsModule from './accountingAccountsSettings'
import AccountingAccountsSettingsController from './accountingAccountsSettings.controller';
import AccountingAccountsSettingsComponent from './accountingAccountsSettings.component';
import AccountingAccountsSettingsTemplate from './accountingAccountsSettings.html';

describe('AccountingAccountsSettings', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingAccountsSettingsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingAccountsSettingsController();
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
      expect(AccountingAccountsSettingsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingAccountsSettingsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingAccountsSettingsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingAccountsSettingsController);
      });
  });
});
