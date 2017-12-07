import PassportInfoFormModule from './passportInfoForm'
import PassportInfoFormController from './passportInfoForm.controller';
import PassportInfoFormComponent from './passportInfoForm.component';
import PassportInfoFormTemplate from './passportInfoForm.html';

describe('PassportInfoForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PassportInfoFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PassportInfoFormController();
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
      expect(PassportInfoFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PassportInfoFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PassportInfoFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PassportInfoFormController);
      });
  });
});
