import AccountingPaypalPageModule from './accountingPaypalPage'
import AccountingPaypalPageController from './accountingPaypalPage.controller';
import AccountingPaypalPageComponent from './accountingPaypalPage.component';
import AccountingPaypalPageTemplate from './accountingPaypalPage.html';

describe('AccountingPaypalPage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingPaypalPageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingPaypalPageController();
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
      expect(AccountingPaypalPageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingPaypalPageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingPaypalPageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingPaypalPageController);
      });
  });
});
