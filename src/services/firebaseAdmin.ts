import * as firebaseAdmin from "firebase-admin";

var serviceAccount = require("./serviceAccountKey.json");

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
  });
  // databaseURL: `https://${projectId}.firebaseio.com`,
}

export { firebaseAdmin };
