import {
  SAVE_POST_START,
  SAVE_POST_SUCCESS,
  SAVE_POST_FAILURE,
  FETCH_POSTS_START,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_FAILURE,
  FETCH_SINGLE_POST_START,
  FETCH_SINGLE_POST_SUCCESS,
  FETCH_SINGLE_POST_FAILURE,
  DELETE_POST_START,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  CHANGE_POST_STATUS_START,
  CHANGE_POST_STATUS_SUCCESS,
  CHANGE_POST_STATUS_FAILURE,
  POST_FILE_UPLOAD_START,
  POST_FILE_UPLOAD_SUCCESS,
  POST_FILE_UPLOAD_FAILURE,
  PPV_PAYMENT_STRIPE_START,
  PPV_PAYMENT_STRIPE_SUCCESS,
  PPV_PAYMENT_STRIPE_FAILURE,
  PPV_PAYMENT_WALLET_START,
  PPV_PAYMENT_WALLET_SUCCESS,
  PPV_PAYMENT_WALLET_FAILURE,
  SAVE_REPORT_POST_FAILURE,
  SAVE_REPORT_POST_SUCCESS,
  SAVE_BLOCK_USER_START,
  FETCH_REPORT_POSTS_FAILURE,
  FETCH_REPORT_POSTS_START,
  FETCH_REPORT_POSTS_SUCCESS,
  SAVE_REPORT_POST_START,
  PPV_PAYMENT_PAYPAL_START,
  PPV_PAYMENT_PAYPAL_SUCCESS,
  PPV_PAYMENT_PAYPAL_FAILURE,
} from "../Actions/ActionConstant";

export const initialState = {
  savePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  posts: {
    data: {},
    loading: true,
    error: false,
  },
  singlePost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  delPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  changePostStatus: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  fileUpload: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  ppvPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  ppvPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  reportPosts: {
    data: {},
    loading: true,
    error: false,
  },
  saveReportPost: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const PostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST_START:
      return {
        ...state,
        savePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case SAVE_POST_SUCCESS:
      return {
        ...state,
        savePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_POST_FAILURE:
      return {
        ...state,
        savePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_POSTS_START:
      return {
        ...state,
        posts: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        posts: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case FETCH_SINGLE_POST_START:
      return {
        ...state,
        singlePost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_SINGLE_POST_SUCCESS:
      return {
        ...state,
        singlePost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_SINGLE_POST_FAILURE:
      return {
        ...state,
        singlePost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case DELETE_POST_START:
      return {
        ...state,
        delPost: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        delPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_POST_FAILURE:
      return {
        ...state,
        delPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case CHANGE_POST_STATUS_START:
      return {
        ...state,
        changePostStatus: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case CHANGE_POST_STATUS_SUCCESS:
      return {
        ...state,
        changePostStatus: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case CHANGE_POST_STATUS_FAILURE:
      return {
        ...state,
        changePostStatus: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_START:
      return {
        ...state,
        fileUpload: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };
    case POST_FILE_UPLOAD_SUCCESS:
      return {
        ...state,
        fileUpload: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case POST_FILE_UPLOAD_FAILURE:
      return {
        ...state,
        fileUpload: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case PPV_PAYMENT_STRIPE_START:
      return {
        ...state,
        ppvPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        ppvPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        ppvPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_START:
      return {
        ...state,
        ppvPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case PPV_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        ppvPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case PPV_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        ppvPayWallet: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };

    case FETCH_REPORT_POSTS_START:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_SUCCESS:
      return {
        ...state,
        reportPosts: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_REPORT_POSTS_FAILURE:
      return {
        ...state,
        reportPosts: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_REPORT_POST_START:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case SAVE_REPORT_POST_SUCCESS:
      return {
        ...state,
        saveReportPost: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case SAVE_REPORT_POST_FAILURE:
      return {
        ...state,
        saveReportPost: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
      case PPV_PAYMENT_PAYPAL_START:
        return {
          ...state,
          ppvPayPal: {
            inputData: action.data,
            loading: true,
            error: false,
            success: {},
            buttonDisable: true,
            loadingButtonContent: "Processing.. Please wait...",
          },
        };
      case PPV_PAYMENT_PAYPAL_SUCCESS:
        return {
          ...state,
          ppvPayPal: {
            loading: false,
            error: false,
            success: action.data,
            buttonDisable: false,
            loadingButtonContent: null,
          },
        };
      case PPV_PAYMENT_PAYPAL_FAILURE:
        return {
          ...state,
          ppvPayPal: {
            loading: true,
            error: action.error,
            success: {},
            buttonDisable: false,
            loadingButtonContent: null,
          },
        };
    default:
      return state;
  }
};

export default PostReducer;
