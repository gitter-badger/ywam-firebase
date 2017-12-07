import AccountingPaypalEventsModule from './accountingPaypalEvents'
import AccountingPaypalEventsController from './accountingPaypalEvents.controller';
import AccountingPaypalEventsComponent from './accountingPaypalEvents.component';
import AccountingPaypalEventsTemplate from './accountingPaypalEvents.html';

describe('AccountingPaypalEvents', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingPaypalEventsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingPaypalEventsController();
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
      expect(AccountingPaypalEventsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingPaypalEventsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingPaypalEventsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingPaypalEventsController);
      });
  });
});
