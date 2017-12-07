import HealthInfoModule from './healthInfo'
import HealthInfoController from './healthInfo.controller';
import HealthInfoComponent from './healthInfo.component';
import HealthInfoTemplate from './healthInfo.html';

describe('HealthInfo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HealthInfoModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HealthInfoController();
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
      expect(HealthInfoTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = HealthInfoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(HealthInfoTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(HealthInfoController);
      });
  });
});
