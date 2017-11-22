"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
__export(require("./triggers/realtime-database/schools.public.online"));
// if you need to use the Firebase Admin SDK, uncomment the following:
// import * as admin from 'firebase-admin'
// Create and Deploy Cloud Function with TypeScript using script that is
// defined in functions/package.json:
//    cd functions
//    npm run deploy
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!\n\n");
});
//# sourceMappingURL=index.js.map