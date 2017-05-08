import BaseSetupModule from './baseSetup'
import BaseSetupController from './baseSetup.controller';
import BaseSetupComponent from './baseSetup.component';
import BaseSetupTemplate from './baseSetup.html';

describe('BaseSetup', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseSetupModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseSetupController();
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
      expect(BaseSetupTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseSetupComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseSetupTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseSetupController);
      });
  });
});
