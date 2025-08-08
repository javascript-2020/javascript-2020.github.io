      var myObject                    = {};
      myObject[Symbol.toStringTag]    = 'my-object';

      var type    = datatype(myObject);
      
      console.log(type);
