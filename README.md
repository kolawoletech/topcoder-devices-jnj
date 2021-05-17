# React Hooks Firestore: Device Check In



## Project setup

In the project directory, you can run:

```
npm install
# or
yarn install
```

or

### Compiles and hot-reloads for development

```
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

#### Compiles and hot-reloads for development

Your application must:
- Display a list of devices currently in storage
- Be able to add and remove devices
- Be able to check-in/out a device to/from storage Give good user feedback on the status of all devices Save updates to a database of your choosing
Run without issues
- Edge cases your application should handle:
- Attempt to check out a device that's already checked out
- Checkouts can only be performed between 9:00am - 17:00pm
- Indicate if a device has been checked out for more than a week
- Max number of allowed in the garage is 10, the system should prevent adding more. 
- Each person can only check out one device at a time.

