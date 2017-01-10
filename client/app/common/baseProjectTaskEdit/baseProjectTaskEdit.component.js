import template from './baseProjectTaskEdit.html';
import controller from './baseProjectTaskEdit.controller';
import './baseProjectTaskEdit.styl';

let baseProjectTaskEditComponent = {
  restrict: 'E',
  bindings: {projectId:'@', //one way binding 
             taskId:'@?', //this will return undfined 
             },
  template,
  controller
};

export default baseProjectTaskEditComponent;
