import AccountingModule from './accounting'
import AccountingController from './accounting.controller';
import AccountingComponent from './accounting.component';
import AccountingTemplate from './accounting.html';

describe('Accounting', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingController();
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
      expect(AccountingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingController);
      });
  });
});
