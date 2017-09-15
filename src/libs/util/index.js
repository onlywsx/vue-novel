const debounce = function (func, wait) {
  let context;
  let args;
  let result;
  let previous;
  let timer;
  const later = function () {
      let diff = Date.now() - previous;
      if (diff < wait && diff > 0) {
          timer = setTimeout(later, wait - diff);
      } else {
          timer = null;
          result = func.apply(context, args);
          if (!timer) {
              context = args = null;
          }
      }
  };
  return function () {
      context = this;
      args = arguments;
      previous = Date.now();
      if (!timer) {
          timer = setTimeout(later, wait);
      }
      return result;
  };
};

const throttle = function (func, wait) {
  let context;
  let args;
  let result;
  let previous = 0;
  let timer = null;
  const later = function () {
      previous = Date.now();
      timer = null;
      result = func.apply(context, args);
      if (!timer) {
          context = args = null;
      }
  };
  return function () {
      context = this;
      args = arguments;
      let diff = Date.now() - previous;
      if (diff >= wait || diff < 0) {
          clearTimeout(timer);
          later();
      } else if (!timer) {
          timer = setTimeout(later, wait - diff);
      }
      return result;
  };
};

export { debounce, throttle};
