import StaffAppsModule from './staffApps'
import StaffAppsController from './staffApps.controller';
import StaffAppsComponent from './staffApps.component';
import StaffAppsTemplate from './staffApps.html';

describe('StaffApps', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StaffAppsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StaffAppsController();
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
      expect(StaffAppsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StaffAppsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StaffAppsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StaffAppsController);
      });
  });
});
