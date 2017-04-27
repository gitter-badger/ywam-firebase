class TranslateSectionController {
   /* @ngInject */
  constructor($stateParams, $firebaseObject, $timeout, $window) {
    var ctrl = this;
        ctrl.section = $stateParams.section
        ctrl.lang = 'de';
       
        ctrl.next = next;
        ctrl.saveEnglish =saveEnglish
        ctrl.saveToLanguage = saveToLanguage
        ctrl.newPhrase = newPhrase


        

    var ref = firebase.database().ref('phrases').child(ctrl.section);
        ctrl.phrases = $firebaseObject(ref);

         ref.once('value',function(snap){
              ctrl.index = ctrl.keys[0]//set the first index on load
         })

        ref.on('value',function(snap){
        
        ctrl.keys = Object.keys(snap.val().en)//.sort();

        })
       
        document.getElementById('tranto').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
                  console.log('submit')  // run your function
                  next()
            }
        });
        document.getElementById('tranfrom').addEventListener('keypress', function(evt) {
            if (evt.which === 13) {
                evt.preventDefault();
                  console.log('save english')  // run your function
                saveEnglish()
                 $timeout(function() {
                    var element = $window.document.getElementById('tranto');
                    if(element)
                    element.focus();
                });
            }
        });

        function saveEnglish(){
                 var phrase =  ctrl.phrases.en[ctrl.index]
                phrase =  htmlToPlaintext(phrase)
                firebase.database().ref('/phrases/').child(ctrl.section).child('en').child(ctrl.index).set(phrase);

        }

        function saveToLanguage(){

                var translation =  ctrl.phrases[ctrl.lang][ctrl.index]
                            translation = htmlToPlaintext(translation)
                        console.log(translation);

                        console.log('Section: '+ ctrl.section+' Language: '+ctrl.lang + ' Key: '+ctrl.index)

                        if(translation){
                        firebase.database().ref('/phrases/').child(ctrl.section).child(ctrl.lang).child(ctrl.index).set(translation);
                        } else{
                            console.log('removing empty phrase'+ ctrl.index)
                            firebase.database().ref('/phrases/').child(ctrl.section).child(ctrl.lang).child(ctrl.index).remove();
                        }
        }    



        function htmlToPlaintext(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
        }

        function  next() {
            
            saveToLanguage()
         
            var loc = ctrl.keys.indexOf(ctrl.index);

           var next_index =  ctrl.keys[loc+1]
            console.log(next_index)

         
         
           ctrl.index = next_index


      }

      function newPhrase(){
          //here we just see how long the array already is and go one higher. 
          var newKey = ctrl.keys.length + 1
           if(!ctrl.index[key])
           ctrl.index = newKey; 
           else{
               //go one higher
               newKey++
               ctrl.index = newKey


           }
      }



  }
}

export default TranslateSectionController;
