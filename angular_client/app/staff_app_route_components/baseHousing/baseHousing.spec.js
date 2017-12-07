import BaseHousingModule from './baseHousing'
import BaseHousingController from './baseHousing.controller';
import BaseHousingComponent from './baseHousing.component';
import BaseHousingTemplate from './baseHousing.html';

describe('BaseHousing', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseHousingModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseHousingController();
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
      expect(BaseHousingTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseHousingComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseHousingTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseHousingController);
      });
  });
});
