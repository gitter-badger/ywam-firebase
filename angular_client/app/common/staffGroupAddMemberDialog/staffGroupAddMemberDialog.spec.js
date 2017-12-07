import StaffGroupAddMemberDialogModule from './staffGroupAddMemberDialog'
import StaffGroupAddMemberDialogController from './staffGroupAddMemberDialog.controller';
import StaffGroupAddMemberDialogComponent from './staffGroupAddMemberDialog.component';
import StaffGroupAddMemberDialogTemplate from './staffGroupAddMemberDialog.html';

describe('StaffGroupAddMemberDialog', () => {
  let $rootScope, makeController;

  beforeEach(window.module(StaffGroupAddMemberDialogModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new StaffGroupAddMemberDialogController();
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
      expect(StaffGroupAddMemberDialogTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = StaffGroupAddMemberDialogComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(StaffGroupAddMemberDialogTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(StaffGroupAddMemberDialogController);
      });
  });
});
