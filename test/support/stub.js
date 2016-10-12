// attribution: http://matthewmanela.com/blog/a-simple-javascript-stubbing-function/

function stub() {
  return {
    of : function (name, callback, returnValue) {
      this[name] = function () {
        var args = Array.prototype.slice.call(arguments);
        this[name].calls.push(args);
        var ret = null;
        if(callback){
          ret = callback.apply(this, args);
        }
        if(returnValue) return returnValue;
        return ret;
      };
      this[name].calls = [];
      return this;
    }
  };
}

module.exports = stub;
