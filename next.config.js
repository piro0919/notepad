module.exports = {
  webpack: (config) => {
    config.resolve.alias.firebaseui = "firebaseui-ja";

    return config;
  },
};
