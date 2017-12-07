import AppAdminNotesModule from './appAdminNotes'
import AppAdminNotesController from './appAdminNotes.controller';
import AppAdminNotesComponent from './appAdminNotes.component';
import AppAdminNotesTemplate from './appAdminNotes.html';

describe('AppAdminNotes', () => {
  let $rootScope, makeController;

  beforeEach(window.module(AppAdminNotesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new AppAdminNotesController();
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
      expect(AppAdminNotesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = AppAdminNotesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(AppAdminNotesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(AppAdminNotesController);
      });
  });
});
