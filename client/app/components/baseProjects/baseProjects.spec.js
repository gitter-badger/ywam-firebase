import BaseProjectsModule from './baseProjects'
import BaseProjectsController from './baseProjects.controller';
import BaseProjectsComponent from './baseProjects.component';
import BaseProjectsTemplate from './baseProjects.html';

describe('BaseProjects', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseProjectsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseProjectsController();
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
      expect(BaseProjectsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseProjectsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseProjectsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseProjectsController);
      });
  });
});
