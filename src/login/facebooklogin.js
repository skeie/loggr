import {
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginManager
} from "react-native-fbsdk";

export const facebookLogin = () => {
  // Attempt a login using the Facebook login dialog asking for default permissions.
  return LoginManager.logInWithReadPermissions(["public_profile", "email"])
    .catch(err => {
      //console.log('Facebook logInWithReadPermissions failed', err);
      throw new Error("Failed to authorize with Facebook");
    })
    .then(onFbAuthorize);
};

const onFbAuthorize = result => {
  if (result.isCancelled) {
    console.log("Facebook login cancelled.");
    throw new Error("Facebook login was cancelled");
  } else {
    return graphRequestForUser().catch(error => {
      console.log("graphRequestForUser() failed ", error);
      throw new Error("Failed to fetch user details from Facebook");
    });
  }
};

const graphRequestForUser = () => {
  return getAccessToken().then(graphRequest).catch(err => {
    console.log("Failed to login with facebook: ", err);
    throw err;
  });
};

const getAccessToken = () => {
  return AccessToken.getCurrentAccessToken().then(token => {
    if (!token) {
      throw new Error("Failed to get facebook access token");
    } else {
      return token;
    }
  });
};

const graphRequest = token => {
  return new Promise((resolve, reject) => {
    try {
      const infoRequest = new GraphRequest("/me?fields=picture,name,email", null, (
        error,
        result
      ) => {
        if (error) {
          reject(error);
        } else {
          console.log("Facebook login success", result, token.accessToken);
          resolve({ facebookData: result, accessToken: token.accessToken });
        }
      });
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start();
    } catch (err) {
      console.log("Failed to do graph request", err);
      reject(err);
    }
  });
};
