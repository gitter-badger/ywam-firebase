import TranslationModule from './translation'
import TranslationController from './translation.controller';
import TranslationComponent from './translation.component';
import TranslationTemplate from './translation.html';

describe('Translation', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TranslationModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TranslationController();
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
      expect(TranslationTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = TranslationComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(TranslationTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(TranslationController);
      });
  });
});
