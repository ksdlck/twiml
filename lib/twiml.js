(function(){
  var element, createDSL, def, __slice = [].slice;
  element = (function(){
    element.displayName = 'element';
    var prototype = element.prototype, constructor = element;
    function element(){
      var arg, _i, _len;
      this.body = [];
      this.attrs = {};
      for (_i = 0, _len = arguments.length; _i < _len; ++_i) {
        arg = arguments[_i];
        if ('object' === typeof arg) {
          if (arg instanceof element || arg instanceof Array) {
            this.body = this.body.concat(arg);
          } else {
            __import(this.attrs, arg);
          }
        } else {
          this.body.push(arg + "");
        }
      }
    }
    prototype.attr = function(name, val){
      this.attrs[name] = val;
      return this;
    };
    prototype.prepend = function(){
      var _ref;
      (_ref = this.body).unshift.apply(_ref, arguments);
      return this;
    };
    prototype.append = function(){
      var _ref;
      (_ref = this.body).push.apply(_ref, arguments);
      return this;
    };
    prototype.insert = function(idx){
      var args, _ref;
      args = __slice.call(arguments, 1);
      (_ref = this.body).slice.apply(_ref, [idx, 0].concat(__slice.call(args)));
      return this;
    };
    prototype.toString = function(){
      var name, attrs, _res;
      _res = [];
      for (name in this.attrs) {
        _res.push(name + "=\"" + this.attrs[name] + "\"");
      }
      attrs = _res;
      return "<" + this.tag + (0 < attrs.length ? " " : "") + attrs + (0 < this.body.length ? ">" + this.body.join("") + "</" + this.tag + ">" : "/>");
    };
    return element;
  }());
  createDSL = function(def){
    var dsl, meth;
    dsl = {};
    for (meth in def) {
      (_fn.call(this, meth));
    }
    dsl.render = function(root){
      return root + "";
    };
    dsl.global = function(){
      var meth;
      for (meth in dsl) {
        GLOBAL[meth] = dsl[meth];
      }
    };
    return dsl;
    function _fn(meth){
      var tag, attrs, x, attr, _ref, _i, _len;
      _ref = def[meth], tag = _ref[0], attrs = _ref[1];
      x = (function(superclass){
        x.displayName = 'x';
        var prototype = __extend(x, superclass).prototype, constructor = x;
        prototype.tag = tag;
        function _ctor(){} _ctor.prototype = prototype;
        function x(){
          var _this = new _ctor;
          superclass.apply(_this, arguments);
          return _this;
        }
        return x;
      }(element));
      x.toString = function(){
        return "<" + tag + "/>";
      };
      for (_i = 0, _len = attrs.length; _i < _len; ++_i) {
        attr = attrs[_i];
        (_fn.call(this, attr));
      }
      dsl[meth] = x;
      function _fn(attr){
        x.prototype[attr] = function(val){
          return this.attr(attr, val);
        };
      }
    }
  };
  def = {
    response: ['Response', []],
    say: ['Say', ['voice', 'language', 'loop']],
    play: ['Play', ['loop']],
    gather: ['Gather', ['action', 'method', 'timeout', 'finishOnKey', 'numDigits']],
    record: ['Record', ['action', 'method', 'timeout', 'finishOnKey', 'maxLength', 'transcribe', 'transcribeCallback', 'playBeep']],
    sms: ['Sms', ['to', 'from', 'action', 'method', 'statusCallback']],
    dial: ['Dial', ['action', 'method', 'timeout', 'hangupOnStar', 'timeLimit', 'callerId']],
    number: ['Number', ['sendDigits', 'url']],
    client: ['Client', []],
    conference: ['Conference', ['muted', 'beep', 'startConferenceOnEnter', 'endConferenceOnExit', 'waitUrl', 'waitMethod', 'maxParticipants']],
    hangup: ['Hangup', []],
    redirect: ['Redirect', ['method']],
    reject: ['Reject', ['reason']],
    pause: ['Pause', ['length']]
  };
  module.exports = createDSL(def);
  function __import(obj, src){
    var own = {}.hasOwnProperty;
    for (var key in src) if (own.call(src, key)) obj[key] = src[key];
    return obj;
  }
  function __extend(sub, sup){
    function fun(){} fun.prototype = (sub.superclass = sup).prototype;
    (sub.prototype = new fun).constructor = sub;
    if (typeof sup.extended == 'function') sup.extended(sub);
    return sub;
  }
}).call(this);
