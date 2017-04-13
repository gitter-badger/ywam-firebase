import AppForModule from './appFor'
import AppForController from './appFor.controller';
import AppForComponent from './appFor.component';
import AppForTemplate from './appFor.html';

describe('AppFor', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AppForModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AppForController();
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
      expect(AppForTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AppForComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AppForTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AppForController);
      });
  });
});
