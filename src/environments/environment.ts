// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:8000/api/notification',
  firebaseConfig: {
    apiKey: "AIzaSyC-IGwzIqCC2mpXJxxCCjhw4eVkzNdIXog",
    vapidKey: 'BK_RHeMFHZJ00BzzWD-1EZvYhwulOcmCZI2Uo-yA98UwPLcdvlnY176afvNfRcG_5fXrpHPs7ma3G_l5HcDH7Wg',
    authDomain: "notificationhub-d9fb5.firebaseapp.com",
    projectId: "notificationhub-d9fb5",
    storageBucket: "notificationhub-d9fb5.firebasestorage.app",
    messagingSenderId: "791895927795",
    appId: "1:791895927795:web:0f76812b85b5d9709fc086",
    measurementId: "G-V1Y7QH4S3L"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
