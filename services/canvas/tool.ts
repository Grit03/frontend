import { axiosInstance } from "../axios-instance";

interface ImageResponse {
  imageId: string;
  roomId: string;
  imageUrl: string;
}

interface DeleteImageForm {
  fileUrl: string;
}

interface RemoveImageForm {
  clothesName: string;
  imageId: string;
  imageUrl: string;
}

export interface GeneratingImageForm {
  clothesName: string;
  imageId: string;
  designStyle:
    | "none"
    | "line-art"
    | "vintage"
    | "graffiti"
    | "pop-art"
    | "geometric"
    | "hand-drawn"
    | "3D"
    | "collage"
    | "watercolor"
    | "sticker";
  prompt: string;
}

interface PromptRecommendForm {
  prompt: string;
}

// 이미지 추가
export const postUploadImage = async (
  formData: FormData,
  accessToken: string,
): Promise<ImageResponse> => {
  const { data } = await axiosInstance.post<ImageResponse>(
    "/image/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

// 이미지 삭제
export const postDeleteImage = async (
  formData: DeleteImageForm,
  accessToken: string,
) => {
  const response = await axiosInstance.post("/image/delete", formData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// 배경 제거
export const postRemoveBg = async (
  formData: RemoveImageForm,
  accessToken: string,
): Promise<ImageResponse> => {
  const { data } = await axiosInstance.post<ImageResponse>(
    "/image/remove-background",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

// 프롬프트 이미지 생성
export const postGeneratingImage = async (
  formData: GeneratingImageForm,
  accessToken: string,
): Promise<ImageResponse> => {
  const { data } = await axiosInstance.post<ImageResponse>(
    "/image/generate",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};

// 프롬프트 추천
export const postRecommedingPrompt = async (
  formData: PromptRecommendForm,
  accessToken: string,
): Promise<string[]> => {
  const { data } = await axiosInstance.post<string[]>(
    "/image/recommend-prompt",
    formData,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
