module.exports = {
  isDev: () => {
    return process.env.NODE_ENV === "development";
  }
};
