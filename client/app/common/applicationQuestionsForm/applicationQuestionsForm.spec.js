import ApplicationQuestionsFormModule from './applicationQuestionsForm'
import ApplicationQuestionsFormController from './applicationQuestionsForm.controller';
import ApplicationQuestionsFormComponent from './applicationQuestionsForm.component';
import ApplicationQuestionsFormTemplate from './applicationQuestionsForm.html';

describe('ApplicationQuestionsForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplicationQuestionsFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplicationQuestionsFormController();
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
      expect(ApplicationQuestionsFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplicationQuestionsFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplicationQuestionsFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplicationQuestionsFormController);
      });
  });
});
