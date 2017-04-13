import EmergencyContactModule from './emergencyContact'
import EmergencyContactController from './emergencyContact.controller';
import EmergencyContactComponent from './emergencyContact.component';
import EmergencyContactTemplate from './emergencyContact.html';

describe('EmergencyContact', () => {
  let $rootScope, makeController;

  beforeEach(window.module(EmergencyContactModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new EmergencyContactController();
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
      expect(EmergencyContactTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = EmergencyContactComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(EmergencyContactTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(EmergencyContactController);
      });
  });
});
