import ApplyMessagesModule from './applyMessages'
import ApplyMessagesController from './applyMessages.controller';
import ApplyMessagesComponent from './applyMessages.component';
import ApplyMessagesTemplate from './applyMessages.html';

describe('ApplyMessages', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ApplyMessagesModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ApplyMessagesController();
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
      expect(ApplyMessagesTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ApplyMessagesComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ApplyMessagesTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ApplyMessagesController);
      });
  });
});
