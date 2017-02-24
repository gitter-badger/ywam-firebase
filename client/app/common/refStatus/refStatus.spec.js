import RefStatusModule from './refStatus'
import RefStatusController from './refStatus.controller';
import RefStatusComponent from './refStatus.component';
import RefStatusTemplate from './refStatus.html';

describe('RefStatus', () => {
  let $rootScope, makeController;

  beforeEach(window.module(RefStatusModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RefStatusController();
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
      expect(RefStatusTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = RefStatusComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(RefStatusTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(RefStatusController);
      });
  });
});
