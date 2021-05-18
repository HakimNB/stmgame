const presets = ['module:metro-react-native-babel-preset'];
const plugins = [
  [
    'module-resolver',
    {
      root: ['./src'],
      alias: {
        '@': './src',
      },
    },
  ],
];

module.exports = {
  presets: presets,
  plugins: plugins,
};
