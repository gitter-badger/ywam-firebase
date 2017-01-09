import SiteTaskListModule from './siteTaskList'
import SiteTaskListController from './siteTaskList.controller';
import SiteTaskListComponent from './siteTaskList.component';
import SiteTaskListTemplate from './siteTaskList.html';

describe('SiteTaskList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(SiteTaskListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new SiteTaskListController();
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
      expect(SiteTaskListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = SiteTaskListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(SiteTaskListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(SiteTaskListController);
      });
  });
});
