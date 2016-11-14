import RoleCallsListModule from './roleCallsList'
import RoleCallsListController from './roleCallsList.controller';
import RoleCallsListComponent from './roleCallsList.component';
import RoleCallsListTemplate from './roleCallsList.html';

describe('RoleCallsList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(RoleCallsListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RoleCallsListController();
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
      expect(RoleCallsListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = RoleCallsListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(RoleCallsListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(RoleCallsListController);
      });
  });
});
