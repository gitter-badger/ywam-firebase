import StartApplicationModule from './startApplication'
import StartApplicationController from './startApplication.controller';
import StartApplicationComponent from './startApplication.component';
import StartApplicationTemplate from './startApplication.html';

describe('StartApplication', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StartApplicationModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StartApplicationController();
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
      expect(StartApplicationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StartApplicationComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StartApplicationTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StartApplicationController);
      });
  });
});
