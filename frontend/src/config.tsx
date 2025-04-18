// import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
// import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
// import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
// import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
// import Session from "supertokens-auth-react/recipe/session";

// export function getApiDomain() {
//     const apiPort = import.meta.env.VITE_APP_API_PORT || 3001;
//     const apiUrl = import.meta.env.VITE_APP_API_URL || `http://localhost:${apiPort}`;
//     return apiUrl;
// }

// export function getWebsiteDomain() {
//     const websitePort = import.meta.env.VITE_APP_WEBSITE_PORT || 3000;
//     const websiteUrl = import.meta.env.VITE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
//     return websiteUrl;
// }

// export const SuperTokensConfig = {
//     appInfo: {
//         appName: "SuperTokens Demo App",
//         apiDomain: `http://192.168.0.112:3001`,
//         websiteDomain: `http://192.168.0.112:3000`,
//     },
//     // recipeList contains all the modules that you want to
//     // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
//     recipeList: [
//         EmailPassword.init(),
//         ThirdParty.init({
//             signInAndUpFeature: {
//                 providers: [Google.init()],
//             },
//         }),
//         Session.init(),
//     ],
//     getRedirectionURL: async (context: any) => {
//         if (context.action === "SUCCESS" && context.newSessionCreated) {
//             const params = new URLSearchParams(window.location.search);
//             const redirectTo = params.get("redirectTo");

//             if (redirectTo && redirectTo.startsWith("/")) {
//                 return redirectTo;
//             }

//             return "/";
//         }
//     }


// };

// export const recipeDetails = {
//     docsLink: "https://supertokens.com/docs/thirdpartyemailpassword/introduction",
// };

// export const PreBuiltUIList = [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI];

// export const ComponentWrapper = (props: { children: JSX.Element }): JSX.Element => {
//     return props.children;
// };

import ThirdParty, { Google } from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import EmailVerification from "supertokens-auth-react/recipe/emailverification";
import { EmailVerificationPreBuiltUI } from "supertokens-auth-react/recipe/emailverification/prebuiltui";

export function getApiDomain() {
    const apiPort = import.meta.env.VITE_APP_API_PORT || 3001;
    const apiUrl = import.meta.env.VITE_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = import.meta.env.VITE_APP_WEBSITE_PORT || 3000;
    const websiteUrl = import.meta.env.VITE_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

// Main SuperTokens configuration
export const SuperTokensConfig = {
    appInfo: {
        appName: "Drug Paradigm", 
        apiDomain: getApiDomain(),
        websiteDomain: getWebsiteDomain(),
    },
    recipeList: [
        EmailPassword.init(),
        ThirdParty.init({
            signInAndUpFeature: {
                providers: [Google.init()],
            },
        }),
        EmailVerification.init({
            mode: "REQUIRED", // or "OPTIONAL"
          }),
        Session.init(),
    ],
    getRedirectionURL: async (context: any) => {
        if (context.action === "SUCCESS" && context.newSessionCreated) {
            if (context.redirectToPath !== undefined) {
                // we are navigating back to where the user was before they authenticated
                return context.redirectToPath;
            }
            if (context.createdNewUser) {
                // user signed up
            } else {
                // user signed in
            }
            return "/";
        }
        return undefined;
    },

};

// 🌐 Documentation link and UI components
export const recipeDetails = {
    docsLink: "https://supertokens.com/docs/thirdpartyemailpassword/introduction",
};

export const PreBuiltUIList = [ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI, EmailVerificationPreBuiltUI] ;

export const ComponentWrapper = (props: { children: JSX.Element }): JSX.Element => {
    return props.children;
};
