(function(){
  require('../lib/twiml').global();
  console.log(render(response(say("Hi!"))));
}).call(this);
