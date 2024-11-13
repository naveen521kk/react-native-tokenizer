/* eslint-disable no-shadow */
const configPlugin = require('@expo/config-plugins');
const pkg = require('@naveen521kk/react-native-tokenizer/package.json');

const withAndroidTokenizer = (config) => {
  config = configPlugin.withGradleProperties(config, (config) => {
    config.modResults =
      configPlugin.AndroidConfig.BuildProperties.updateAndroidBuildProperty(
        config.modResults,
        'android.minSdkVersion',
        '26'
      );
    return config;
  });
  return config;
};

exports.default = configPlugin.createRunOncePlugin(
  withAndroidTokenizer,
  pkg.name,
  pkg.version
);
