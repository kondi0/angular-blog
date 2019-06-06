// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  apiUrl: 'https://jsonplaceholder.typicode.com',
  imageUrl: 'https://picsum.photos/1200/400?random',
  postBodyLength: 34,
  userInfo: 'userInfo',
  firebase: {
    apiKey: 'AIzaSyBdsRzRgqZoqUQs4acS_PVfwr3og5IvMIk',
    authDomain: 'app-conasa.firebaseapp.com',
    databaseURL: 'https://app-conasa.firebaseio.com',
    projectId: 'app-conasa',
    storageBucket: 'app-conasa.appspot.com',
    messagingSenderId: '112567818501'
  }

};
