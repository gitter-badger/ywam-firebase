import BaseBuildingsModule from './baseBuildings'
import BaseBuildingsController from './baseBuildings.controller';
import BaseBuildingsComponent from './baseBuildings.component';
import BaseBuildingsTemplate from './baseBuildings.html';

describe('BaseBuildings', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BaseBuildingsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BaseBuildingsController();
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
      expect(BaseBuildingsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BaseBuildingsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BaseBuildingsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BaseBuildingsController);
      });
  });
});
