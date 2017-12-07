import ApplicationQuestionAdminEditModule from './applicationQuestionAdminEdit'
import ApplicationQuestionAdminEditController from './applicationQuestionAdminEdit.controller';
import ApplicationQuestionAdminEditComponent from './applicationQuestionAdminEdit.component';
import ApplicationQuestionAdminEditTemplate from './applicationQuestionAdminEdit.html';

describe('ApplicationQuestionAdminEdit', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplicationQuestionAdminEditModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplicationQuestionAdminEditController();
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
      expect(ApplicationQuestionAdminEditTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplicationQuestionAdminEditComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplicationQuestionAdminEditTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplicationQuestionAdminEditController);
      });
  });
});
