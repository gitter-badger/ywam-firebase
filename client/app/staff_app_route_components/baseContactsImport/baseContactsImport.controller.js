class BaseContactsImportController {
   /* @ngInject */
  constructor($scope, $timeout) {
   
    var ctrl = this;
        ctrl.csv ={ content: null,
          header: true,
          headerVisible: true,
          separator: ',',
          separatorVisible: true,
          result: null,
          // encoding: 'UTF-8',
          encodingVisible: true,
            uploadButtonLabel: "upload a csv file",
            progressCallback: function(progress) {
               $timeout( function() {
                    ctrl.progress = progress;
                });
            },
            streamingCallback: function(stream) {
                if ( typeof stream != "undefined" ) {
                   $timeout( function() {
                        ctrl.preview = stream[window.Math.floor(window.Math.random()*stream.length)];
                    });
                }
            },
            streamingErrorCallback: function(streamError) {
                console.log(streamError);
            }
          }
          
          

  }
}

export default BaseContactsImportController;
