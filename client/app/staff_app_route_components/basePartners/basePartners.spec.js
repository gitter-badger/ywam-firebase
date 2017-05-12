import BasePartnersModule from './basePartners'
import BasePartnersController from './basePartners.controller';
import BasePartnersComponent from './basePartners.component';
import BasePartnersTemplate from './basePartners.html';

describe('BasePartners', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BasePartnersModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BasePartnersController();
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
      expect(BasePartnersTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BasePartnersComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BasePartnersTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BasePartnersController);
      });
  });
});
