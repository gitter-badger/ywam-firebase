import BasePermissionsAddDialogModule from './basePermissionsAddDialog'
import BasePermissionsAddDialogController from './basePermissionsAddDialog.controller';
import BasePermissionsAddDialogComponent from './basePermissionsAddDialog.component';
import BasePermissionsAddDialogTemplate from './basePermissionsAddDialog.html';

describe('BasePermissionsAddDialog', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BasePermissionsAddDialogModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BasePermissionsAddDialogController();
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
      expect(BasePermissionsAddDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BasePermissionsAddDialogComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BasePermissionsAddDialogTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BasePermissionsAddDialogController);
      });
  });
});
