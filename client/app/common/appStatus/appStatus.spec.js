import AppStatusModule from './appStatus'
import AppStatusController from './appStatus.controller';
import AppStatusComponent from './appStatus.component';
import AppStatusTemplate from './appStatus.html';

describe('AppStatus', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AppStatusModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AppStatusController();
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
      expect(AppStatusTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AppStatusComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AppStatusTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AppStatusController);
      });
  });
});
