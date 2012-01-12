(function(){
  require('../lib/twiml').global();
  console.log(render(response(dial(number("+12345678901")), dial(client("k")))));
}).call(this);
