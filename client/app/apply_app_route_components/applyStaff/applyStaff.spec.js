import ApplyStaffModule from './applyStaff'
import ApplyStaffController from './applyStaff.controller';
import ApplyStaffComponent from './applyStaff.component';
import ApplyStaffTemplate from './applyStaff.html';

describe('ApplyStaff', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplyStaffModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplyStaffController();
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
      expect(ApplyStaffTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplyStaffComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplyStaffTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplyStaffController);
      });
  });
});
