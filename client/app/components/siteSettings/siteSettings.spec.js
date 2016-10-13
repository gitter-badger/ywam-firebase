import SiteSettingsModule from './siteSettings'
import SiteSettingsController from './siteSettings.controller';
import SiteSettingsComponent from './siteSettings.component';
import SiteSettingsTemplate from './siteSettings.html';

describe('SiteSettings', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SiteSettingsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SiteSettingsController();
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
      expect(SiteSettingsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SiteSettingsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SiteSettingsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SiteSettingsController);
      });
  });
});
