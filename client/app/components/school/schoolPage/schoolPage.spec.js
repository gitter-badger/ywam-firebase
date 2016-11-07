import SchoolPageModule from './schoolPage'
import SchoolPageController from './schoolPage.controller';
import SchoolPageComponent from './schoolPage.component';
import SchoolPageTemplate from './schoolPage.html';

describe('SchoolPage', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolPageModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolPageController();
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
      expect(SchoolPageTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolPageComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolPageTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolPageController);
      });
  });
});
