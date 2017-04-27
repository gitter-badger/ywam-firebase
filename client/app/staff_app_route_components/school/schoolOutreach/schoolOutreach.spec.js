import SchoolOutreachModule from './schoolOutreach'
import SchoolOutreachController from './schoolOutreach.controller';
import SchoolOutreachComponent from './schoolOutreach.component';
import SchoolOutreachTemplate from './schoolOutreach.html';

describe('SchoolOutreach', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolOutreachModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolOutreachController();
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
      expect(SchoolOutreachTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolOutreachComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolOutreachTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolOutreachController);
      });
  });
});
