import SidenavModule from './sidenav'
import SidenavController from './sidenav.controller';
import SidenavComponent from './sidenav.component';
import SidenavTemplate from './sidenav.html';

describe('Sidenav', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SidenavModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SidenavController();
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
      expect(SidenavTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SidenavComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SidenavTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SidenavController);
      });
  });
});
