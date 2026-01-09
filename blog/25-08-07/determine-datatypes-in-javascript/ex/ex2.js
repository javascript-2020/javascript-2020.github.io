
      var myObject                    = {};
      myObject[Symbol.toStringTag]    = 'my-object';
      
      var datatype    = v=>Object.prototype.toString.call(v).slice(8,-1).toLowerCase();
      
      var type        = datatype(myObject);
      console.log(type);
      