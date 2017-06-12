import StaffGroupsModule from './staffGroups'
import StaffGroupsController from './staffGroups.controller';
import StaffGroupsComponent from './staffGroups.component';
import StaffGroupsTemplate from './staffGroups.html';

describe('StaffGroups', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StaffGroupsModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StaffGroupsController();
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
      expect(StaffGroupsTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StaffGroupsComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StaffGroupsTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StaffGroupsController);
      });
  });
});
