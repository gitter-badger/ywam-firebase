import AppStatusesSelectorModule from './appStatusesSelector'
import AppStatusesSelectorController from './appStatusesSelector.controller';
import AppStatusesSelectorComponent from './appStatusesSelector.component';
import AppStatusesSelectorTemplate from './appStatusesSelector.html';

describe('AppStatusesSelector', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AppStatusesSelectorModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AppStatusesSelectorController();
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
      expect(AppStatusesSelectorTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AppStatusesSelectorComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AppStatusesSelectorTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AppStatusesSelectorController);
      });
  });
});
