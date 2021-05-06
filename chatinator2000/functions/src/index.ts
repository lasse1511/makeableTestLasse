import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const censorWords = functions.firestore
    .document('messages/{messageId}')
    .onCreate((snap, context) => {
        return snap.ref.update({ value: snap.data().value.replace(/\bmicrosoft\b/gi, '********').replace(/\bgoogle\b/gi, '******').replace(/\bapple\b/gi, '*****')  })
    });

