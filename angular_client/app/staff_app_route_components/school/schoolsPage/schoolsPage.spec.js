import SchoolsPageModule from './schoolsPage'
import SchoolsPageController from './schoolsPage.controller';
import SchoolsPageComponent from './schoolsPage.component';
import SchoolsPageTemplate from './schoolsPage.html';

describe('SchoolsPage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolsPageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolsPageController();
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
      expect(SchoolsPageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolsPageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolsPageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolsPageController);
      });
  });
});
