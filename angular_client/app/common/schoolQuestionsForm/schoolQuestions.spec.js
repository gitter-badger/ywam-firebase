import SchoolQuestionsModule from './schoolQuestions'
import SchoolQuestionsController from './schoolQuestions.controller';
import SchoolQuestionsComponent from './schoolQuestions.component';
import SchoolQuestionsTemplate from './schoolQuestions.html';

describe('SchoolQuestions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolQuestionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolQuestionsController();
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
      expect(SchoolQuestionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolQuestionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolQuestionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolQuestionsController);
      });
  });
});
