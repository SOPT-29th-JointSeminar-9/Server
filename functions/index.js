const admin = require('firebase-admin');
const serviceAccount = require('./genie-31a04-firebase-adminsdk-qxvqa-6fe20274bb.json');
const dotenv = require('dotenv');

dotenv.config();

let firebase;
if (admin.apps.length === 0) {
  firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} else {
  firebase = admin.app();
}

module.exports = {
  api: require('./api'),
};
