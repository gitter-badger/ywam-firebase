import SchoolRoleCallModule from './schoolRoleCall'
import SchoolRoleCallController from './schoolRoleCall.controller';
import SchoolRoleCallComponent from './schoolRoleCall.component';
import SchoolRoleCallTemplate from './schoolRoleCall.html';

describe('SchoolRoleCall', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolRoleCallModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolRoleCallController();
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
      expect(SchoolRoleCallTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolRoleCallComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolRoleCallTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolRoleCallController);
      });
  });
});
