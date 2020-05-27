const DotEnv = require('dotenv');
const parsedEnv = DotEnv.config().parsed;

module.exports = () => {
  for (const key in parsedEnv) {
    if (typeof parsedEnv[key] === 'string') {
      parsedEnv[key] = JSON.stringify(parsedEnv[key]);
    }
  }
  return parsedEnv;
};
