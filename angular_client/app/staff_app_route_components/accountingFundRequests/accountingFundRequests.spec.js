import AccountingFundRequestsModule from './accountingFundRequests'
import AccountingFundRequestsController from './accountingFundRequests.controller';
import AccountingFundRequestsComponent from './accountingFundRequests.component';
import AccountingFundRequestsTemplate from './accountingFundRequests.html';

describe('AccountingFundRequests', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingFundRequestsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingFundRequestsController();
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
      expect(AccountingFundRequestsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingFundRequestsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingFundRequestsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingFundRequestsController);
      });
  });
});
