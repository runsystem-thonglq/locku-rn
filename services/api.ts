import { useNavigation } from "@react-navigation/native";
import {
  LoginPayloadType,
  LoginResponseType,
  RefreshTokenPayloadType,
  RefreshTokenResponseType,
} from "../types/auth";
import { MomentType } from "../types/moments";
import { GetAccountInfoResponseType, UserInfoType } from "../types/user";
import secureStorage from "@/utils/secure-store";
import $axios, {
  AxiosHeaders,
  //   AxiosScope,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import axios from "axios";
import { loginHeader, loginUrl, uploaderHeader } from "@/constants/locket";
export type ResponseError<T> = {
  error: T;
};

export type GenericError = {
  code: number;
  message: string;
  errors: {
    message: string;
    domain: string;
    reason: string;
  }[];
};

export async function fetchFirebase<Request, ResponseOk, ResponseNotOk>({
  endpoint,
  method,
  body,
  token,
  noKey = false,
}: {
  endpoint: string;
  method: string;
  body?: Request;
  token?: string;
  noKey?: boolean;
}) {
  // const headers = new Headers();
  // headers.append("Content-Type", "application/json");
  // headers.append("Accept-Language", "en-US");
  // headers.append(
  //   "User-Agent",
  //   "FirebaseAuth.iOS/10.23.1 com.locket.Locket/1.82.0 iPhone/18.0 hw/iPhone12_1"
  // );
  // headers.append("X-Ios-Bundle-Identifier", "com.locket.Locket");
  // headers.append(
  //   "X-Client-Version",
  //   "iOS/FirebaseSDK/10.23.1/FirebaseCore-iOS"
  // );
  // headers.append(
  //   "X-Firebase-GMPID",
  //   "1:641029076083:ios:cc8eb46290d69b234fa606"
  // );
  // headers.append(
  //   "X-Firebase-Client",
  //   "H4sIAAAAAAAAAKtWykhNLCpJSk0sKVayio7VUSpLLSrOzM9TslIyUqoFAFyivEQfAAAA"
  // );
  // headers.append(
  //   "X-Firebase-AppCheck",
  //   "eyJraWQiOiJNbjVDS1EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjY0MTAyOTA3NjA4Mzppb3M6Y2M4ZWI0NjI5MGQ2OWIyMzRmYTYwNiIsImF1ZCI6WyJwcm9qZWN0c1wvNjQxMDI5MDc2MDgzIiwicHJvamVjdHNcL2xvY2tldC00MjUyYSJdLCJwcm92aWRlciI6ImRldmljZV9jaGVja19kZXZpY2VfaWRlbnRpZmljYXRpb24iLCJpc3MiOiJodHRwczpcL1wvZmlyZWJhc2VhcHBjaGVjay5nb29nbGVhcGlzLmNvbVwvNjQxMDI5MDc2MDgzIiwiZXhwIjoxNzIyMTY3ODk4LCJpYXQiOjE3MjIxNjQyOTgsImp0aSI6ImlHUGlsT1dDZGg4Mll3UTJXRC1neEpXeWY5TU9RRFhHcU5OR3AzTjFmRGcifQ.lqTOJfdoYLpZwYeeXtRliCdkVT7HMd7_Lj-d44BNTGuxSYPIa9yVAR4upu3vbZSh9mVHYS8kJGYtMqjP-L6YXsk_qsV_gzKC2IhVAV6KbPDRHdevMfBC6fRiOSVn7vt749GVFdZqAuDCXhCILsaMhvgDBgZoDilgAPtpNwyjz-VtRB7OdOUbuKTCqdoSOX0SJWVUMyuI8nH0-unY--YRctunK8JHZDxBaM_ahVggYPWBCpzxq9Yeq8VSPhadG_tGNaADStYPaeeUkZ7DajwWqH5ze6ESpuFNgAigwPxCM735_ZiPeD7zHYwppQA9uqTWszK9v9OvWtFCsgCEe22O8awbNbuEBTKJpDQ8xvZe8iEYyhfUPncER3S-b1CmuXR7tFCdTgQe5j7NGWjFvN_CnL7D2nudLwxWlpqwASCHvHyi8HBaJ5GpgriTLXAAinY48RukRDBi9HwEzpRecELX05KTD2lTOfQCjKyGpfG2VUHP5Xm36YbA3iqTDoDXWMvV"
  // );

  // if (token) {
  //   headers.append("Authorization", `Bearer ${token}`);
  // }

  return new Promise<ResponseOk>((res, rej) => {
    (async () => {
      try {
        const response = await fetch(loginUrl, {
          method,
          headers: loginHeader,
          body: JSON.stringify(body),
        });

        if (response.status !== 200) {
          rej((await response.json()) as ResponseError<ResponseNotOk>);
          return;
        }

        res((await response.json()) as ResponseOk);
      } catch (error) {
        rej(error);
      }
    })();
  });
}

function create(axiosOptions: AxiosRequestConfig, isAuth: boolean = true) {
  //   const navigation = useNavigation();
  const Axios = $axios.create(axiosOptions);

  Axios.defaults.headers.common["Content-Type"] = "application/json";

  //   Axios.setHeader = function (
  //     name: string,
  //     value: string | boolean,
  //     scopes: AxiosScope | AxiosScope[] = "common"
  //   ) {
  //     for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
  //       if (!value) {
  //         if (scope in (this as AxiosInstance).defaults.headers) {
  //           // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  //           delete (this as AxiosInstance).defaults.headers[scope][name];
  //         }
  //         continue;
  //       }

  //       (this as AxiosInstance).defaults.headers[scope][name] = value;
  //     }
  //   };
  //   Axios.setHeader(headers?.name, headers?.value);

  Axios.interceptors.request.use(async (config) => {
    const token = await secureStorage.getValue("USER");
    if (token?.idToken && isAuth) {
      config.headers.Authorization = `Bearer ${token?.idToken}`;
    }
    console.log(!!token?.idToken, "TOKEN");

    return config;
  });

  // Add response interceptor
  Axios.interceptors.response.use(
    (response) => {
      // Do something with response data
      return response;
    },
    async (error) => {
      console.log(error, "ERROR");
      if (error.status === 401 && isAuth) {
        const originalRequest = error.config;
        originalRequest._retry = true;
        const token = await secureStorage.getValue("USER");
        const accessToken = token?.idToken;
        const refreshToken = token?.refreshToken;

        if (!accessToken || !refreshToken) {
          //   return navigation.navigate("Home" as never);
        }

        const response = await API.refreshToken(refreshToken);

        if (!response) {
          const token = await secureStorage.getValue("USER");
          // await $auth.logout();
          //   return navigation.navigate("Login" as never);
        }

        const newAccessToken = response.id_token;
        const newRefreshToken = response.refresh_token;
        if (newAccessToken && newRefreshToken) {
          // setUser({
          //   ...user,
          //   accessToken: newAccessToken,
          //   refreshToken: newRefreshToken,
          // });
          await secureStorage.setValue("USER", {
            ...token,
            idToken: newAccessToken,
            refreshToken: newRefreshToken,
          });

          return Axios(originalRequest);
        }
      }

      //   if (error.status === HTTP_STATUS_ENUM.Forbidden) {
      //     return navigateTo(PATH_CONSTANT.NOT_FOUND);
      //   }

      //   let res: ResponseError;
      //   if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      //     res = {
      //       status: HTTP_STATUS_ENUM.RequestTimeout,
      //       data: {
      //         message: MESSAGES.API_TIMEOUT,
      //       },
      //     };
      //   } else {
      //     res = {
      //       status: error?.response?.status,
      //       data: error?.response?.data,
      //     } as ResponseError;
      //   }
      return Promise.reject({
        status: error?.response?.status,
        data: error?.response?.data,
      });
    }
  );

  return Axios;
}

export async function uploadImageToFirebaseStorage(
  idUser: string,
  idToken: string,
  image: Blob
) {
  try {
    const nameImg = `${new Date().getTime()}_vtd182.webp`;
    const imageSize = image.size;

    const url = `https://firebasestorage.googleapis.com/v0/b/locket-img/o/users%2F${idUser}%2Fmoments%2Fthumbnails%2F${nameImg}?uploadType=resumable&name=users%2F${idUser}%2Fmoments%2Fthumbnails%2F${nameImg}`;

    const headers = {
      "content-type": "application/json; charset=UTF-8",
      authorization: `Bearer ${idToken}`,
      "x-goog-upload-protocol": "resumable",
      accept: "*/*",
      "x-goog-upload-command": "start",
      "x-goog-upload-content-length": imageSize.toString(),
      "accept-language": "vi-VN,vi;q=0.9",
      "x-firebase-storage-version": "ios/10.13.0",
      "user-agent":
        "com.locket.Locket/1.43.1 iPhone/17.3 hw/iPhone15_3 (GTMSUF/1)",
      "x-goog-upload-content-type": "image/webp",
      "x-firebase-gmpid": "1:641029076083:ios:cc8eb46290d69b234fa609",
    };

    const data = {
      name: `users/${idUser}/moments/thumbnails/${nameImg}`,
      contentType: "image/*",
      bucket: "",
      metadata: { creator: idUser, visibility: "private" },
    };

    const response = await axios.post(url, data, {
      headers: headers,
      validateStatus: (status) => {
        return status! < 500;
      },
    });
    // console.log(
    //   response.status,
    //   "RESPONSE",
    //   response.headers["x-goog-upload-url"]
    // );
    const uploadUrl = response.headers["x-goog-upload-url"] as string;
    await axios.put(uploadUrl, image, {
      headers: uploaderHeader,
      validateStatus: (status) => {
        return status! < 500;
      },
    });
    console.log("RESPONSE_PUT");
    const getUrl = `https://firebasestorage.googleapis.com/v0/b/locket-img/o/users%2F${idUser}%2Fmoments%2Fthumbnails%2F${nameImg}`;

    const getHeaders = {
      Authorization: `Bearer ${idToken}`,
      "Content-Type": "application/json; charset=UTF-8",
      // Accept: "*/*",
      // "User-Agent":
      //   "com.locket.Locket/1.43.1 iPhone/17.3 hw/iPhone15_3 (GTMSUF/1)",
      // "x-firebase-storage-version": "ios/10.23.1",
      // "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      // "X-Firebase-AppCheck":
      //   "eyJraWQiOiJNbjVDS1EiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxOjY0MTAyOTA3NjA4Mzppb3M6Y2M4ZWI0NjI5MGQ2OWIyMzRmYTYwNiIsImF1ZCI6WyJwcm9qZWN0c1wvNjQxMDI5MDc2MDgzIiwicHJvamVjdHNcL2xvY2tldC00MjUyYSJdLCJwcm92aWRlciI6ImRldmljZV9jaGVja19kZXZpY2VfaWRlbnRpZmljYXRpb24iLCJpc3MiOiJodHRwczpcL1wvZmlyZWJhc2VhcHBjaGVjay5nb29nbGVhcGlzLmNvbVwvNjQxMDI5MDc2MDgzIiwiZXhwIjoxNzIyMTY3ODk4LCJpYXQiOjE3MjIxNjQyOTgsImp0aSI6ImlHUGlsT1dDZGg4Mll3UTJXRC1neEpXeWY5TU9RRFhHcU5OR3AzTjFmRGcifQ.lqTOJfdoYLpZwYeeXtRliCdkVT7HMd7_Lj-d44BNTGuxSYPIa9yVAR4upu3vbZSh9mVHYS8kJGYtMqjP-L6YXsk_qsV_gzKC2IhVAV6KbPDRHdevMfBC6fRiOSVn7vt749GVFdZqAuDCXhCILsaMhvgDBgZoDilgAPtpNwyjz-VtRB7OdOUbuKTCqdoSOX0SJWVUMyuI8nH0-unY--YRctunK8JHZDxBaM_ahVggYPWBCpzxq9Yeq8VSPhadG_tGNaADStYPaeeUkZ7DajwWqH5ze6ESpuFNgAigwPxCM735_ZiPeD7zHYwppQA9uqTWszK9v9OvWtFCsgCEe22O8awbNbuEBTKJpDQ8xvZe8iEYyhfUPncER3S-b1CmuXR7tFCdTgQe5j7NGWjFvN_CnL7D2nudLwxWlpqwASCHvHyi8HBaJ5GpgriTLXAAinY48RukRDBi9HwEzpRecELX05KTD2lTOfQCjKyGpfG2VUHP5Xm36YbA3iqTDoDXWMvV",
    };
    console.log(idUser, "GET_HEADERS", getUrl);
    const responseGet = await axios.get(getUrl, {
      headers: getHeaders,
    });
    console.log(responseGet.status, "RESPONSE_GET");
    const downloadToken = responseGet.data["downloadTokens"];

    return `${getUrl}?alt=media&token=${downloadToken}`;
  } catch (error) {
    console.log(error, "ERROR");
    return null;
  }
}

export async function fetchLocket<Response>({
  endpoint,
  method,
  body,
}: {
  endpoint: string;
  method: string;
  body?: any;
  token?: string;
}) {
  //   const headers = new Headers();
  //   headers.append("Content-Type", "application/json");

  //   if (token) {
  //     headers.append("Authorization", `Bearer ${token}`);
  //   } else {
  //     await new Promise(async (res) => {
  //       const token = await secureStorage.getValue("USER");
  //       const tokenInfo = JSON.parse(token || "{}");
  //       console.log(tokenInfo, "TOKEN");
  //       headers.append("Authorization", `Bearer ${tokenInfo?.token}`);
  //       res(null);
  //     });
  //   }

  return new Promise<Response>((res, rej) => {
    (async () => {
      try {
        // url:`https://api.locketcamera.com/${endpoint}`,
        // method,
        // data:body
        const axios = create({
          baseURL: "https://api.locketcamera.com",
        });
        const response = await axios.request({
          url: `https://api.locketcamera.com/${endpoint}`,
          method,
          data: body,
        });

        // const response = await fetch(
        //   `https://api.locketcamera.com/${endpoint}`,
        //   {
        // method,
        // headers,
        // body: JSON.stringify(body),
        //   }
        // );
        // const response = await fetch(
        //   `https://api.locketcamera.com/${endpoint}`,
        //   {
        //     method,
        //     headers,
        //     body: JSON.stringify(body),
        //   }
        // );

        if (response.status !== 200) {
          rej(response.data);
          return;
        }

        res(response.data?.result as Response);
      } catch (error) {
        rej(error);
      }
    })();
  });
}

export const API = {
  login: (email: string, password: string) =>
    fetchFirebase<any, LoginResponseType, GenericError>({
      endpoint:
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCQngaaXQIfJaH0aS2l7REgIjD7nL431So",
      method: "POST",
      body: {
        email,
        password,
        returnSecureToken: true,
        clientType: "CLIENT_TYPE_IOS",
      },
    }),
  refreshToken: (refreshToken: string) =>
    fetchFirebase<
      RefreshTokenPayloadType,
      RefreshTokenResponseType,
      GenericError
    >({
      endpoint: "https://securetoken.googleapis.com/v1/token",
      method: "POST",
      body: {
        grantType: "refresh_token",
        refreshToken: refreshToken,
      },
    }),
  getAccountInfo: (idToken: string) =>
    fetchFirebase<
      {
        idToken: string;
      },
      GetAccountInfoResponseType,
      GenericError
    >({
      endpoint:
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo",
      method: "POST",
      body: {
        idToken: idToken,
      },
    }),
  fetchLatestMoment: (token?: string) =>
    fetchLocket<MomentType>({
      endpoint: "getLatestMomentV2",
      method: "POST",
      body: {
        data: {
          last_fetch: 10,
          should_count_missed_moments: true,
        },
      },
      token: token,
    }),
  fetchUser: (uid: string, token?: string) =>
    fetchLocket<UserInfoType>({
      endpoint: "fetchUserV2",
      method: "POST",
      body: {
        data: {
          user_uid: uid,
        },
      },
      token: token,
    }),
  createPost: (thumbUrl: string, caption: string, token?: string) =>
    fetchLocket<any>({
      endpoint: "postMomentV2",
      method: "POST",
      token: token,
      body: {
        data: !caption
          ? {
              thumbnail_url: thumbUrl,
              recipients: [],
              overlays: [],
            }
          : {
              caption,
              thumbnail_url: thumbUrl,
              recipients: [],
              overlays: [
                {
                  overlay_id: "caption:standard",
                  overlay_type: "caption",
                  data: {
                    text_color: "#FFFFFFE6",
                    text: caption,
                    type: "standard",
                    max_lines: 4,
                    background: {
                      colors: [],
                      material_blur: "ultra-thin",
                    },
                  },
                  alt_text: caption,
                },
              ],
            },
      },
    }),
};

export const postImageToLocket = async (
  idUser: string,
  idToken: string,
  image: Blob,
  caption: string
) => {
  try {
    const thumbUrl = await uploadImageToFirebaseStorage(idUser, idToken, image);
    console.log(thumbUrl, "THUMB URL");
    const response = await API.createPost(
      thumbUrl ||
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg/220px-Lionel-Messi-Argentina-2022-FIFA-World-Cup_%28cropped%29.jpg",
      caption,
      idToken
    );
    return response;
  } catch (error) {
    throw error;
  }
};
