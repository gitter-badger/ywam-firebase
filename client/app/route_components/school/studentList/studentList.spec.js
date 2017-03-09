import StudentListModule from './studentList'
import StudentListController from './studentList.controller';
import StudentListComponent from './studentList.component';
import StudentListTemplate from './studentList.html';

describe('StudentList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StudentListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StudentListController();
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
      expect(StudentListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StudentListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StudentListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StudentListController);
      });
  });
});
