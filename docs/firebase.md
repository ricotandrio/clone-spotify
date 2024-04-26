# Firebase Firestore Configuration

Firestore Rules Configuration:

```js
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow only authenticated users to read and write their own user data
    match /account/{userId}/{document=**} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Example: allow read, write, delete for listening_history collection
    match /account/{userId}/listening_history/{document=**} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }

    // Example: allow read, write, delete for user_library collection
    match /account/{userId}/user_library/{document=**} {
      allow read, write, delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```