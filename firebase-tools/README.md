## Add large amount of data to firebase

### 1. import data from .env
- Add this line in file you want to read data from .env file(s)
```
import "dotenv/config";
```

### 2. import json to process.
- Add new line in **tsconfig.json** file
```
"compilerOptions": {
        ...
        "resolveJsonModule": true, // <-- add this new line
    },
```

### 3. Firebase rules:
- Reference: https://firebase.google.com/docs/firestore/security/insecure-rules
- To write large amount of data, set:
```
allow read, write: if true

``` 
- The best rules should be applied from now are: 
```

```