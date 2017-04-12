import BaseSchoolQuestionsModule from './baseSchoolQuestions'
import BaseSchoolQuestionsController from './baseSchoolQuestions.controller';
import BaseSchoolQuestionsComponent from './baseSchoolQuestions.component';
import BaseSchoolQuestionsTemplate from './baseSchoolQuestions.html';

describe('BaseSchoolQuestions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseSchoolQuestionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseSchoolQuestionsController();
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
      expect(BaseSchoolQuestionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseSchoolQuestionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseSchoolQuestionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseSchoolQuestionsController);
      });
  });
});
