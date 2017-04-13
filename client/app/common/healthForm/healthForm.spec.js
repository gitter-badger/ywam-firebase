import HealthFormModule from './healthForm'
import HealthFormController from './healthForm.controller';
import HealthFormComponent from './healthForm.component';
import HealthFormTemplate from './healthForm.html';

describe('HealthForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(HealthFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new HealthFormController();
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
      expect(HealthFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = HealthFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(HealthFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(HealthFormController);
      });
  });
});
