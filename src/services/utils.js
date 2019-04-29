const utils = {
  delay(duration) {
    return new Promise((resolve) => {
      setTimeout(resolve, duration);
    });
  },
};

export default utils;
