import SchoolStaffModule from './schoolStaff'
import SchoolStaffController from './schoolStaff.controller';
import SchoolStaffComponent from './schoolStaff.component';
import SchoolStaffTemplate from './schoolStaff.html';

describe('SchoolStaff', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolStaffModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolStaffController();
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
      expect(SchoolStaffTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolStaffComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolStaffTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolStaffController);
      });
  });
});
