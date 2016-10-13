import PermissionsModule from './permissions'
import PermissionsController from './permissions.controller';
import PermissionsComponent from './permissions.component';
import PermissionsTemplate from './permissions.html';

describe('Permissions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PermissionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PermissionsController();
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
      expect(PermissionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PermissionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PermissionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PermissionsController);
      });
  });
});
