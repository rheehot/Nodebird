export const initialState = {
  isLogginOut: false, // 로그아웃 시도중
  isLoggingIn: false, // 로그인 시도중
  logInErrorReason: "", // 로그인 실패 사유
  signedUp: false, // 회원가입 성공 여부
  isSigningUp: false, // 회원가입 시도중
  signUpErrorReason: "", // 회원가입 실패 사유
  me: null, // 내정보
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로우 리스트
  userInfo: null, // 유저의 정보
  isEditingNickname: false, // 이름 수정중 여부
  editNicknameErrorReason: "", // 이름변경 실패 사유
  hasMoreFollower: false,
  hasMoreFollowing: false,
};

// 비동기 액션 => 리덕스 사가로 처리
export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const EDIT_NICKNAME_REQUEST = "EDIT_NICKNAME_REQUEST";
export const EDIT_NICKNAME_SUCCESS = "EDIT_NICKNAME_SUCCESS";
export const EDIT_NICKNAME_FAILURE = "EDIT_NICKNAME_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";
export const REMOVE_POST_OF_ME = "REMOVE_POST_OF_ME";

// export const signUpAction = () => ({ type: SIGN_UP_REQUEST, data });
// export const signUpSuccess = {
//   type: SIGN_UP_SUCCESS,
// };
// export const loginRequestAction = (data) => ({
//   type: LOG_IN_REQUEST,
// });

// export const logoutRequestAction = {
//   type: LOG_OUT_REQUEST,
// };
// export const signUpRequestAction = (data) => ({
//   type: SIGN_UP_REQUEST,
//   data,
// });
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoggingIn: true,
        logInErrorReason: "",
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoggingIn: false,

        me: action.data,
        isLoading: false,
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoggingIn: false,
        logInErrorReason: action.error,
        me: null,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLoggingOut: true,
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggingOut: false,
        me: null,
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSigningUp: true,
        isSignedUP: false,
        signUpErrorReason: "",
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSigninUp: false,
        isSigningUp: false,
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSigningUp: false,
        signUpErrorReason: action.error,
      };
    }
    //
    case LOAD_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          me: action.data,
        };
      }
      return {
        ...state,
        userInfo: action.data,
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
      };
    }
    //
    case FOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: [{ id: action.data }, ...state.me.Followings],
        },
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state,
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followings: state.me.Followings.filter((v) => v.id !== action.data),
        },
        followingList: state.followingList.filter((v) => v.id !== action.data),
      };
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state,
      };
    }
    case ADD_POST_TO_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: [{ id: action.data }, ...state.me.Posts],
        },
      };
    }
    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state,
        hasMoreFollower: action.offset ? state.hasMoreFollower : true, // 처음 데이터를 가져올 때는 더보기 버튼을 보여주는 거
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList: state.followerList.concat(action.data),
        hasMoreFollower: action.data.length === 3,
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state,
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state,
        hasMoreFollowing: action.offset ? state.hasMoreFollowing : true,
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: state.followingList.concat(action.data),
        hasMoreFollowing: action.data.length === 3,
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state,
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        me: {
          ...state.me,
          Followers: state.me.Followers.filter((v) => v.id !== action.data),
        },
        followerList: state.followerList.filter((v) => v.id !== action.data),
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state,
      };
    }
    //
    case REMOVE_POST_OF_ME: {
      return {
        ...state,
        me: {
          ...state.me,
          Posts: state.me.Posts.filter((v) => v.id !== action.data),
        },
      };
    }
    case EDIT_NICKNAME_REQUEST: {
      return {
        ...state,
        isEditingNickname: true,
        editNicknameErrorReason: "",
      };
    }
    case EDIT_NICKNAME_SUCCESS: {
      return {
        ...state,
        isEditingNickname: false,
        me: {
          ...state.me,
          nickname: action.data,
        },
      };
    }
    case EDIT_NICKNAME_FAILURE: {
      return {
        ...state,
        isEditingNickname: false,
        editNicknameErrorReason: action.data,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer;
