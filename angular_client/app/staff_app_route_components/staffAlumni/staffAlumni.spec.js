import StaffAlumniModule from './staffAlumni'
import StaffAlumniController from './staffAlumni.controller';
import StaffAlumniComponent from './staffAlumni.component';
import StaffAlumniTemplate from './staffAlumni.html';

describe('StaffAlumni', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StaffAlumniModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StaffAlumniController();
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
      expect(StaffAlumniTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StaffAlumniComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StaffAlumniTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StaffAlumniController);
      });
  });
});
