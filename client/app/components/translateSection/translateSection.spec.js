import TranslateSectionModule from './translateSection'
import TranslateSectionController from './translateSection.controller';
import TranslateSectionComponent from './translateSection.component';
import TranslateSectionTemplate from './translateSection.html';

describe('TranslateSection', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TranslateSectionModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TranslateSectionController();
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
      expect(TranslateSectionTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = TranslateSectionComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(TranslateSectionTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(TranslateSectionController);
      });
  });
});
