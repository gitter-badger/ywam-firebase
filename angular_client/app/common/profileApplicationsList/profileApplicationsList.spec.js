import ProfileApplicationsListModule from './profileApplicationsList'
import ProfileApplicationsListController from './profileApplicationsList.controller';
import ProfileApplicationsListComponent from './profileApplicationsList.component';
import ProfileApplicationsListTemplate from './profileApplicationsList.html';

describe('ProfileApplicationsList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ProfileApplicationsListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ProfileApplicationsListController();
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
      expect(ProfileApplicationsListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ProfileApplicationsListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ProfileApplicationsListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ProfileApplicationsListController);
      });
  });
});
