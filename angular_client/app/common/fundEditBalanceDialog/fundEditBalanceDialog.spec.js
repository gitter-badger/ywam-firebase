import FundEditBalanceDialogModule from './fundEditBalanceDialog'
import FundEditBalanceDialogController from './fundEditBalanceDialog.controller';
import FundEditBalanceDialogComponent from './fundEditBalanceDialog.component';
import FundEditBalanceDialogTemplate from './fundEditBalanceDialog.html';

describe('FundEditBalanceDialog', () => {
  let $rootScope, makeController;

  beforeEach(window.module(FundEditBalanceDialogModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new FundEditBalanceDialogController();
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
      expect(FundEditBalanceDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = FundEditBalanceDialogComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(FundEditBalanceDialogTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(FundEditBalanceDialogController);
      });
  });
});
