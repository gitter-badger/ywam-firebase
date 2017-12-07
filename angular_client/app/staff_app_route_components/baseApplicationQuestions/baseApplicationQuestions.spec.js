import BaseApplicationQuestionsModule from './baseApplicationQuestions'
import BaseApplicationQuestionsController from './baseApplicationQuestions.controller';
import BaseApplicationQuestionsComponent from './baseApplicationQuestions.component';
import BaseApplicationQuestionsTemplate from './baseApplicationQuestions.html';

describe('BaseApplicationQuestions', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseApplicationQuestionsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseApplicationQuestionsController();
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
      expect(BaseApplicationQuestionsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseApplicationQuestionsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseApplicationQuestionsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseApplicationQuestionsController);
      });
  });
});
