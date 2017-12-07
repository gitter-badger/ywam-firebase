import UserApplicationsListModule from './userApplicationsList'
import UserApplicationsListController from './userApplicationsList.controller';
import UserApplicationsListComponent from './userApplicationsList.component';
import UserApplicationsListTemplate from './userApplicationsList.html';

describe('UserApplicationsList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(UserApplicationsListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new UserApplicationsListController();
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
      expect(UserApplicationsListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = UserApplicationsListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(UserApplicationsListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(UserApplicationsListController);
      });
  });
});
