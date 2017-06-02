import ContactInfoFormModule from './contactInfoForm'
import ContactInfoFormController from './contactInfoForm.controller';
import ContactInfoFormComponent from './contactInfoForm.component';
import ContactInfoFormTemplate from './contactInfoForm.html';

describe('ContactInfoForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ContactInfoFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ContactInfoFormController();
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
      expect(ContactInfoFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ContactInfoFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ContactInfoFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ContactInfoFormController);
      });
  });
});
