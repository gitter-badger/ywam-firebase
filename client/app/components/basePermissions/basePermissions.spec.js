import BasePermissionsModule from './basePermissions'
import BasePermissionsController from './basePermissions.controller';
import BasePermissionsComponent from './basePermissions.component';
import BasePermissionsTemplate from './basePermissions.html';

describe('BasePermissions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BasePermissionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BasePermissionsController();
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
      expect(BasePermissionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BasePermissionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BasePermissionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BasePermissionsController);
      });
  });
});
