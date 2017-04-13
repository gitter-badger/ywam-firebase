import LanguagesModule from './languages'
import LanguagesController from './languages.controller';
import LanguagesComponent from './languages.component';
import LanguagesTemplate from './languages.html';

describe('Languages', () => {
  let $rootScope, makeController;

  beforeEach(window.module(LanguagesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new LanguagesController();
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
      expect(LanguagesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = LanguagesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(LanguagesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(LanguagesController);
      });
  });
});
