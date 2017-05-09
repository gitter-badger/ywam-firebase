import AccountingStripeEventsModule from './accountingStripeEvents'
import AccountingStripeEventsController from './accountingStripeEvents.controller';
import AccountingStripeEventsComponent from './accountingStripeEvents.component';
import AccountingStripeEventsTemplate from './accountingStripeEvents.html';

describe('AccountingStripeEvents', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingStripeEventsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingStripeEventsController();
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
      expect(AccountingStripeEventsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingStripeEventsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingStripeEventsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingStripeEventsController);
      });
  });
});
