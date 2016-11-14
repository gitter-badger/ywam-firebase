import BaseModule from './base'
import BaseController from './base.controller';
import BaseComponent from './base.component';
import BaseTemplate from './base.html';

describe('Base', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseController();
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
      expect(BaseTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseController);
      });
  });
});
