let obj = {
    name: "Lian",
    age: 23,
    undef: undefined,
    value: null,
    arr: [2, 3],
    myObj: {
      getAge: function () {
        return 15;
      },
      myArr: [{ a: 5, user: { name: "John", age: 25 } }, 6],
    },
};
  
  //Recursive implementation of jSON.stringify;
const stringifyJSON = function (obj) {
    let arrOfKeyVals = [],
      arrVals = [],
      objKeys = [];
  
    /*********CHECK FOR PRIMITIVE TYPES**********/
    if (typeof obj === "number" || typeof obj === "boolean" || obj === null) {
      return "" + obj;
    }
  
    if (typeof obj === "string") {
      return '"' + obj + '"';
    }
  
    /*********CHECK FOR ARRAY**********/
    if (Array.isArray(obj)) {
      //check for empty array
      if (obj.length === 0) {
        return "[]";
      } else {
        obj.forEach(function (el) {
          arrVals.push(stringifyJSON(el));
        });
        return "[" + arrVals + "]";
      }
    }
  
    /*********CHECK FOR OBJECT**********/
    if (obj instanceof Object) {
      //get object keys
      objKeys = Object.keys(obj);
      //set key output;
      objKeys.forEach(function (key) {
        let keyOut = '"' + key + '":';
        let keyValOut = obj[key];
        //skip functions and undefined properties
        if (keyValOut instanceof Function || typeof keyValOut === undefined) {
          // arrOfKeyVals.push('');
          return;
        } else if (typeof keyValOut === "string") {
          arrOfKeyVals.push(keyOut + '"' + keyValOut + '"');
        } else if (
          typeof keyValOut === "boolean" ||
          typeof keyValOut === "number" ||
          keyValOut === null
        ) {
          arrOfKeyVals.push(keyOut + keyValOut);
        }
  
        //check for nested objects, call recursively until no more objects
        else if (keyValOut instanceof Object) {
          arrOfKeyVals.push(keyOut + stringifyJSON(keyValOut));
        }
      });
      console.log("arrOfKeyVals", arrOfKeyVals);
  
      return "{" + arrOfKeyVals + "}";
    }
};
  
const str = stringifyJSON(obj);
  
console.log(str);
console.log(JSON.stringify(obj));
  
console.log(JSON.stringify(obj) === str);
  