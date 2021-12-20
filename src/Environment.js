import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConstants } from "./Components/Constant/constants";

const Environment = {
  postMethod: async (action, object) => {
    let userId =
      await AsyncStorage.getItem("userId") !== "" &&
      await AsyncStorage.getItem("userId") !== null &&
      await AsyncStorage.getItem("userId") !== undefined
        ? await AsyncStorage.getItem("userId")
        : "";

    let accessToken =
      await AsyncStorage.getItem("accessToken") !== "" &&
      await AsyncStorage.getItem("accessToken") !== null &&
      await AsyncStorage.getItem("accessToken") !== undefined
        ? await AsyncStorage.getItem("accessToken")
        : "";

    const url = apiConstants.apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

    var socialLoginUser = 0;

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);

      if (key === "social_unique_id") {
        socialLoginUser = 1;
      }
    }

    // By Default added device type and login type in future use
    if (!socialLoginUser) {
      formData.append("login_by", apiConstants.LOGIN_BY);
    }

    formData.append("device_type", apiConstants.DEVICE_TYPE);
    formData.append("device_token", apiConstants.DEVICE_TOKEN);

    return await axios.post(url, formData);

    // Progress bar
    // {
    //   onUploadProgress: (ProgressEvent) => {
    //     console.log({
    //       loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
    //     });
    //   },
    // }
  },

  getMethod: async (action, object) => {
    let userId =
      await AsyncStorage.getItem("userId") !== "" &&
      await AsyncStorage.getItem("userId") !== null &&
      await AsyncStorage.getItem("userId") !== undefined
        ? await AsyncStorage.getItem("userId")
        : "";
    let accessToken =
      await AsyncStorage.getItem("accessToken") !== "" &&
      await AsyncStorage.getItem("accessToken") !== null &&
      await AsyncStorage.getItem("accessToken") !== undefined
        ? await AsyncStorage.getItem("accessToken")
        : "";

    const url = apiConstants.apiUrl + action;

    let formData = new FormData();

    // By Default Id and token

    formData.append("id", userId);
    formData.append("token", accessToken);

    // append your data
    for (var key in object) {
      formData.append(key, object[key]);
    }

    // By Default added device type and login type in future use

    formData.append("login_by", apiConstants.LOGIN_BY);
    formData.append("device_type", apiConstants.DEVICE_TYPE);
    formData.append("device_token", apiConstants.DEVICE_TOKEN);

    return await axios.get(url, formData);
  },

  /*methods(action) {

        const url = apiConstants.apiUrl+'/api/'+action;

        return {
            getOne: ({ id }) => axios.get(`${url}/${id}`),
            getAll: (toGet) => axios.post(url, toGet),
            update: (toUpdate) =>  axios.put(url,toUpdate),
            create: (toCreate) =>  axios.put(url,toCreate),
            delete: ({ id }) =>  axios.delete(`${url}/${id}`)
        }
    }*/
};

export default Environment;
