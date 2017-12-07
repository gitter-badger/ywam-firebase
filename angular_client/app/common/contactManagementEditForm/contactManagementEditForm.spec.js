import ContactManagementEditFormModule from './contactManagementEditForm'
import ContactManagementEditFormController from './contactManagementEditForm.controller';
import ContactManagementEditFormComponent from './contactManagementEditForm.component';
import ContactManagementEditFormTemplate from './contactManagementEditForm.html';

describe('ContactManagementEditForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContactManagementEditFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContactManagementEditFormController();
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
      expect(ContactManagementEditFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ContactManagementEditFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ContactManagementEditFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ContactManagementEditFormController);
      });
  });
});
