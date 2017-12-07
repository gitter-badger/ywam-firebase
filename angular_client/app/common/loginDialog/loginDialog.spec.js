import LoginDialogModule from './loginDialog'
import LoginDialogController from './loginDialog.controller';
import LoginDialogComponent from './loginDialog.component';
import LoginDialogTemplate from './loginDialog.html';

describe('LoginDialog', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LoginDialogModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LoginDialogController();
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
      expect(LoginDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = LoginDialogComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LoginDialogTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LoginDialogController);
      });
  });
});
