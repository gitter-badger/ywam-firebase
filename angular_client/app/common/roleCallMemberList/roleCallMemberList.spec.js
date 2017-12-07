import RoleCallMemberListModule from './roleCallMemberList'
import RoleCallMemberListController from './roleCallMemberList.controller';
import RoleCallMemberListComponent from './roleCallMemberList.component';
import RoleCallMemberListTemplate from './roleCallMemberList.html';

describe('RoleCallMemberList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(RoleCallMemberListModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RoleCallMemberListController();
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
      expect(RoleCallMemberListTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = RoleCallMemberListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(RoleCallMemberListTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(RoleCallMemberListController);
      });
  });
});
