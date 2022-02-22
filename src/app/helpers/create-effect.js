String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

export const createEffect = (fn, rcb, scb, ecb) => {
  return async function(payload) {
    try {
      this[rcb]();
      let res = await fn(payload);
      this[scb](res);
    } catch (e) {
      this[ecb](e);
    }
  };
};

export const createAdvancedEffect = (fn, keyword) => {
  keyword = keyword.capitalize();
  const onKeyword = "on" + keyword;
  return createEffect(
    fn,
    onKeyword + "Request",
    onKeyword + "Success",
    onKeyword + "Error"
  );
};
