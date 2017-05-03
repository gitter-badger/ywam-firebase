import AccountingDesignationsModule from './accountingDesignations'
import AccountingDesignationsController from './accountingDesignations.controller';
import AccountingDesignationsComponent from './accountingDesignations.component';
import AccountingDesignationsTemplate from './accountingDesignations.html';

describe('AccountingDesignations', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingDesignationsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingDesignationsController();
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
      expect(AccountingDesignationsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingDesignationsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingDesignationsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingDesignationsController);
      });
  });
});
