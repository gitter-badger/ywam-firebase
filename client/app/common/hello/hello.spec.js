import HelloModule from './hello'
import HelloController from './hello.controller';
import HelloComponent from './hello.component';
import HelloTemplate from './hello.html';

describe('Hello', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HelloModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HelloController();
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
      expect(HelloTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = HelloComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(HelloTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(HelloController);
      });
  });
});
