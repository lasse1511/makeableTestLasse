import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const censorWords = functions.firestore
    .document('messages/{messageId}')
    .onCreate((snap, context) => {
        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const wordsToCensor = ['microsoft', 'google', 'apple']
        const newValue = snap.data();
        const value = newValue.value;
        const words = value.split(' ')
        for (var i in words) {
            for (var x in wordsToCensor) {
                console.log(words[i].toLowerCase(), x)
                if (words[i].toLowerCase() === wordsToCensor[x]) {
                    words[i] = '*****'
                }
            }
        }
        console.log(words.join(" "))
        return snap.ref.update({value: words.join(" ")})
    });