import ApplyDashboardModule from './applyDashboard'
import ApplyDashboardController from './applyDashboard.controller';
import ApplyDashboardComponent from './applyDashboard.component';
import ApplyDashboardTemplate from './applyDashboard.html';

describe('ApplyDashboard', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplyDashboardModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplyDashboardController();
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
      expect(ApplyDashboardTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplyDashboardComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplyDashboardTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplyDashboardController);
      });
  });
});
