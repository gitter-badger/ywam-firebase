import StaffCurrentModule from './staffCurrent'
import StaffCurrentController from './staffCurrent.controller';
import StaffCurrentComponent from './staffCurrent.component';
import StaffCurrentTemplate from './staffCurrent.html';

describe('StaffCurrent', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StaffCurrentModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StaffCurrentController();
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
      expect(StaffCurrentTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StaffCurrentComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StaffCurrentTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StaffCurrentController);
      });
  });
});
