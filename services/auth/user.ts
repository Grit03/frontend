import axios, { AxiosError } from "axios";
import { axiosInstance } from "../axios-instance";
import { UserInfo, UserInfoWithToken } from "@/types/user";

export interface IdCheckForm {
  loginId: string;
}

export interface RegisterForm {
  loginId: string;
  password: string;
  passwordCheck: string;
  userName: string;
}

interface IdCheckResponse {
  value: boolean;
  message: string;
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

interface LoginResponse {
  success: boolean;
  errorType?: "wrong" | "fail";
  userInfo?: UserInfoWithToken;
  message?: string;
}

export interface LoginFormData {
  loginId: string;
  password: string;
}

// 아이디 체크
export const postIdCheck = async (
  formData: IdCheckForm,
): Promise<IdCheckResponse> => {
  try {
    const { data } = await axiosInstance.post("/user/join/id-check", formData);
    return {
      value: true,
      message: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<string>;
      if (axiosError.response && axiosError.response.status === 409) {
        // 409 에러인 경우 text/plain 메시지를 출력
        const errorMessage = axiosError.response.data;
        console.error("Conflict error message:", errorMessage);
        return {
          value: false,
          message: errorMessage,
        };
      } else {
        console.error("Other Axios error:", axiosError.message);
        return {
          value: false,
          message: "잘못된 요청입니다",
        };
      }
    } else {
      return {
        value: false,
        message: "잘못된 요청입니다",
      };
    }
  }
};

// 회원가입
export const postRegister = async (
  formData: RegisterForm,
): Promise<RegisterResponse> => {
  try {
    await axiosInstance.post("/user/join", formData);
    return {
      success: true,
      message: "회원가입에 성공하였습니다! 로그인해주세요.",
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<string>;
      if (
        axiosError.response &&
        (axiosError.response.status === 400 ||
          axiosError.response.status === 409)
      ) {
        const errorMessage = axiosError.response.data;
        return {
          success: false,
          message: errorMessage,
        };
      } else
        return {
          success: false,
          message: "잘못된 요청입니다",
        };
    } else
      return {
        success: false,
        message: "잘못된 요청입니다",
      };
  }
};

export const postLogin = async (
  formData: LoginFormData,
): Promise<LoginResponse> => {
  try {
    const { data } = await axiosInstance.post("/user/login", formData);
    return {
      success: true,
      userInfo: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<string>;
      if (axiosError.response && axiosError.response.status === 403) {
        return {
          success: false,
          errorType: "wrong",
          message: "아이디 혹은 패스워드가 잘못되었습니다.",
        };
      } else
        return {
          success: false,
          errorType: "fail",
          message: "잘못된 요청입니다",
        };
    } else
      return {
        success: false,
        errorType: "fail",
        message: "잘못된 요청입니다",
      };
  }
};

// 디자인 캔버스 조회
export const getUserInfo = async (accessToken: string): Promise<UserInfo> => {
  const { data } = await axiosInstance.get("/user/info", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
