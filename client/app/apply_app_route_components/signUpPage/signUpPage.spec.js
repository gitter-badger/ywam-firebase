import SignUpPageModule from './signUpPage'
import SignUpPageController from './signUpPage.controller';
import SignUpPageComponent from './signUpPage.component';
import SignUpPageTemplate from './signUpPage.html';

describe('SignUpPage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SignUpPageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SignUpPageController();
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
      expect(SignUpPageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SignUpPageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SignUpPageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SignUpPageController);
      });
  });
});
