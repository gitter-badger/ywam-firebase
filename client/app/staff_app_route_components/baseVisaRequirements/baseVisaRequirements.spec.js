import BaseVisaRequirementsModule from './baseVisaRequirements'
import BaseVisaRequirementsController from './baseVisaRequirements.controller';
import BaseVisaRequirementsComponent from './baseVisaRequirements.component';
import BaseVisaRequirementsTemplate from './baseVisaRequirements.html';

describe('BaseVisaRequirements', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseVisaRequirementsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseVisaRequirementsController();
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
      expect(BaseVisaRequirementsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseVisaRequirementsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseVisaRequirementsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseVisaRequirementsController);
      });
  });
});
