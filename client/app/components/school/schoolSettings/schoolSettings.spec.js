import SchoolSettingsModule from './schoolSettings'
import SchoolSettingsController from './schoolSettings.controller';
import SchoolSettingsComponent from './schoolSettings.component';
import SchoolSettingsTemplate from './schoolSettings.html';

describe('SchoolSettings', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolSettingsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolSettingsController();
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
      expect(SchoolSettingsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolSettingsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolSettingsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolSettingsController);
      });
  });
});
