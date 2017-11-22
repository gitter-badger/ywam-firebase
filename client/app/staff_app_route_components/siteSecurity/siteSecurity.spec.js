import SiteSecurityModule from './siteSecurity'
import SiteSecurityController from './siteSecurity.controller';
import SiteSecurityComponent from './siteSecurity.component';
import SiteSecurityTemplate from './siteSecurity.html';

describe('SiteSecurity', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SiteSecurityModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SiteSecurityController();
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
      expect(SiteSecurityTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SiteSecurityComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SiteSecurityTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SiteSecurityController);
      });
  });
});
