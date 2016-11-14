import SchoolRoleCallsModule from './schoolRoleCalls'
import SchoolRoleCallsController from './schoolRoleCalls.controller';
import SchoolRoleCallsComponent from './schoolRoleCalls.component';
import SchoolRoleCallsTemplate from './schoolRoleCalls.html';

describe('SchoolRoleCalls', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolRoleCallsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolRoleCallsController();
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
      expect(SchoolRoleCallsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolRoleCallsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolRoleCallsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolRoleCallsController);
      });
  });
});
