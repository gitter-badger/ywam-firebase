import AccountingFundInfoModule from './accountingFundInfo'
import AccountingFundInfoController from './accountingFundInfo.controller';
import AccountingFundInfoComponent from './accountingFundInfo.component';
import AccountingFundInfoTemplate from './accountingFundInfo.html';

describe('AccountingFundInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingFundInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingFundInfoController();
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
      expect(AccountingFundInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingFundInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingFundInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingFundInfoController);
      });
  });
});
