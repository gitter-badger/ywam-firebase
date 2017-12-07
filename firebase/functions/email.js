const functions = require('firebase-functions');
const admin = require('firebase-admin');
try { admin.initializeApp(functions.config().firebase); } catch (e) { } // You do that because the admin SDK can only be initialized once.
const SparkPost = require('sparkpost');
const handlebars = require('handlebars')
const Mjml = require('mjml');



var templates = {}
templates['default'] = `
<mjml>
  <mj-body>
    <mj-container>
        <mj-section>
        <mj-column>
          <mj-text>{{location.name}}</mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-text>{{body}}</mj-text>
        </mj-column>
      </mj-section>
    </mj-container>
  </mj-body>
</mjml>
`;



exports.send = function (params) {
  if (!params.subject)
  return console.error('params.subject can not be empty')

  var p = []
  var api_key = ''
  var location_meta = {}

  //first get keys
  p[p.length] = admin.database().ref('/location_private/sparkpost').once('value').then(function (snap) {
    api_key = snap.val().api_key;
  })
  //get location data
  p[p.length] = admin.database().ref('/location_public/meta').once('value').then(function (snap) {
    location_meta = snap.val();
  })

  return Promise.all(p).then(() => {

    const sparky = new SparkPost(api_key);

    if (!params.template)
      params.template = 'default';
    
    // if (!params.to)
    //     return console.log('no array of to addreses ')

    // mix in location data 
    params.data.location = location_meta

    // grap the template   
    var template = handlebars.compile(templates[params.template])

    // interpolation of data in template
    const interpolated_template = template(params.data);
    // render mjml to html 
    const result = Mjml.mjml2html(interpolated_template);
    const html = result.html
    //if template had mjml errors
    if (result.errors)
       console.log(result.errors)



    // begin send of email
    return sparky.transmissions.send({
      options: {
        // sandbox: true
      },
      content: {
        from: '***',
        subject: params.subject,
        html: html
      },
      recipients: [
        { address: '***m' }
      ]
    })
      .then(data => {
        console.log('Email Sent!');
        console.log(data);
      })
      .catch(err => {
        console.log('Whoops! Something went wrong');
        console.log(err);

      });
  })



}
