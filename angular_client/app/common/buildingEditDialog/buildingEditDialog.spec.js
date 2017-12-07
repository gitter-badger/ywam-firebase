import BuildingEditDialogModule from './buildingEditDialog'
import BuildingEditDialogController from './buildingEditDialog.controller';
import BuildingEditDialogComponent from './buildingEditDialog.component';
import BuildingEditDialogTemplate from './buildingEditDialog.html';

describe('BuildingEditDialog', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BuildingEditDialogModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BuildingEditDialogController();
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
      expect(BuildingEditDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BuildingEditDialogComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BuildingEditDialogTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BuildingEditDialogController);
      });
  });
});
