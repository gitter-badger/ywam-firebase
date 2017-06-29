import AccountingTransactionLinkToContactModule from './accountingTransactionLinkToContact'
import AccountingTransactionLinkToContactController from './accountingTransactionLinkToContact.controller';
import AccountingTransactionLinkToContactComponent from './accountingTransactionLinkToContact.component';
import AccountingTransactionLinkToContactTemplate from './accountingTransactionLinkToContact.html';

describe('AccountingTransactionLinkToContact', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingTransactionLinkToContactModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingTransactionLinkToContactController();
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
      expect(AccountingTransactionLinkToContactTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingTransactionLinkToContactComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingTransactionLinkToContactTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingTransactionLinkToContactController);
      });
  });
});
