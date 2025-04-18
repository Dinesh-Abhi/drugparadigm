// import ThirdParty from 'supertokens-node/recipe/thirdparty';
// import EmailPassword from 'supertokens-node/recipe/emailpassword';
// import Session from 'supertokens-node/recipe/session';
// import Dashboard from 'supertokens-node/recipe/dashboard';
// import UserRoles from 'supertokens-node/recipe/userroles';


// export const appInfo = {
//   // Learn more about this on https://supertokens.com/docs/thirdpartypasswordless/appInfo
//   appName: 'ST',
//   apiDomain: 'http://192.168.0.112:3001',
//   websiteDomain: 'http://192.168.0.112:3000',
//   apiBasePath: '/auth',
//   websiteBasePath: '/auth',
// };

// export const connectionUri = 'https://try.supertokens.com'; // super tokens connection uri

// export const recipeList = [
//   EmailPassword.init(),
//   ThirdParty.init({
//     signInAndUpFeature: {
//       providers: [
//         // We have provided you with development keys which you can use for testing.
//         // IMPORTANT: Please replace them with your own OAuth keys for production use.
//         {
//           config: {
//             thirdPartyId: 'google',
//             clients: [
//               {
//                 clientId:
//                   '1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com',
//                 clientSecret: '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',
//               },
//             ],
//           },
//         },
//         // {
//         //   config: {
//         //     thirdPartyId: 'github',
//         //     clients: [
//         //       {
//         //         clientId: '467101b197249757c71f',
//         //         clientSecret: 'e97051221f4b6426e8fe8d51486396703012f5bd',
//         //       },
//         //     ],
//         //   },
//         // },
//         // {
//         //   config: {
//         //     thirdPartyId: 'apple',
//         //     clients: [
//         //       {
//         //         clientId: '4398792-io.supertokens.example.service',
//         //         additionalConfig: {
//         //           keyId: '7M48Y4RYDL',
//         //           privateKey:
//         //             '-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----',
//         //           teamId: 'YWQCXGJRJL',
//         //         },
//         //       },
//         //     ],
//         //   },
//         // },
//         // {
//         //   config: {
//         //     thirdPartyId: 'twitter',
//         //     clients: [
//         //       {
//         //         clientId: '4398792-WXpqVXRiazdRMGNJdEZIa3RVQXc6MTpjaQ',
//         //         clientSecret:
//         //           'BivMbtwmcygbRLNQ0zk45yxvW246tnYnTFFq-LH39NwZMxFpdC',
//         //       },
//         //     ],
//         //   },
//         // },
//       ],
//     },
//   }),
//   Session.init(),
//   Dashboard.init(),
//   UserRoles.init(),
// ];

import ThirdParty from 'supertokens-node/recipe/thirdparty';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Session from 'supertokens-node/recipe/session';
import Dashboard from 'supertokens-node/recipe/dashboard';
import UserRoles from 'supertokens-node/recipe/userroles';
import * as dotenv from 'dotenv';
import EmailVerification from "supertokens-node/recipe/emailverification";

dotenv.config();

const APP_PORT = process.env.API_PORT || 3001;
const API_URL = process.env.API_URL || `http://localhost:${APP_PORT}`;
const WEBSITE_PORT = process.env.WEBSITE_PORT || 3000;
const WEBSITE_URL = process.env.APP_WEBSITE_URL || `http://localhost:${WEBSITE_PORT}`;

export const appInfo = {
  appName: process.env.APP_NAME || 'Drug Paradigm',
  apiDomain: API_URL,
  websiteDomain: WEBSITE_URL,
  apiBasePath: '/auth',
  websiteBasePath: '/auth',
};

export const connectionUri = process.env.SUPERTOKENS_CONNECTION_URI || 'https://try.supertokens.com';

export const recipeList = [
  EmailPassword.init(),
  ThirdParty.init({
    signInAndUpFeature: {
      providers: [
        {
          config: {
            thirdPartyId: 'google',
            clients: [
              {
                clientId: process.env.GOOGLE_CLIENT_ID || '',
                clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
              },
            ],
          },
        },
      ],
    },
  }),
  EmailVerification.init({
    mode: "REQUIRED", // or "OPTIONAL"
  }),
  Session.init(),
  Dashboard.init(),
  UserRoles.init(),
];
