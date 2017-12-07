import ReferenceFormModule from './referenceForm'
import ReferenceFormController from './referenceForm.controller';
import ReferenceFormComponent from './referenceForm.component';
import ReferenceFormTemplate from './referenceForm.html';

describe('ReferenceForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ReferenceFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ReferenceFormController();
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
      expect(ReferenceFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ReferenceFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ReferenceFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ReferenceFormController);
      });
  });
});
