import AccountingBrainTreeModule from './accountingBrainTree'
import AccountingBrainTreeController from './accountingBrainTree.controller';
import AccountingBrainTreeComponent from './accountingBrainTree.component';
import AccountingBrainTreeTemplate from './accountingBrainTree.html';

describe('AccountingBrainTree', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AccountingBrainTreeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AccountingBrainTreeController();
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
      expect(AccountingBrainTreeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AccountingBrainTreeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AccountingBrainTreeTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AccountingBrainTreeController);
      });
  });
});
