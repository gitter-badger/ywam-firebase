import SchoolStatsModule from './schoolStats'
import SchoolStatsController from './schoolStats.controller';
import SchoolStatsComponent from './schoolStats.component';
import SchoolStatsTemplate from './schoolStats.html';

describe('SchoolStats', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SchoolStatsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SchoolStatsController();
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
      expect(SchoolStatsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SchoolStatsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SchoolStatsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SchoolStatsController);
      });
  });
});
