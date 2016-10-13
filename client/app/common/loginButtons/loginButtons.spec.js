import LoginButtonsModule from './loginButtons'
import LoginButtonsController from './loginButtons.controller';
import LoginButtonsComponent from './loginButtons.component';
import LoginButtonsTemplate from './loginButtons.html';

describe('LoginButtons', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LoginButtonsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LoginButtonsController();
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
      expect(LoginButtonsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = LoginButtonsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LoginButtonsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LoginButtonsController);
      });
  });
});
