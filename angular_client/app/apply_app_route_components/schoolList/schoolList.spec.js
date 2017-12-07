import SchoolListModule from './schoolList'
import SchoolListController from './schoolList.controller';
import SchoolListComponent from './schoolList.component';
import SchoolListTemplate from './schoolList.html';

describe('SchoolList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolListController();
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
      expect(SchoolListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolListController);
      });
  });
});
