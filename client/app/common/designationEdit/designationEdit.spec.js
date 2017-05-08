import DesignationEditModule from './designationEdit'
import DesignationEditController from './designationEdit.controller';
import DesignationEditComponent from './designationEdit.component';
import DesignationEditTemplate from './designationEdit.html';

describe('DesignationEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DesignationEditModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DesignationEditController();
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
      expect(DesignationEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DesignationEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DesignationEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DesignationEditController);
      });
  });
});
