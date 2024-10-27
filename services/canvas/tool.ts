import { axiosInstance } from "../axios-instance";

// export interface UploadImageForm {
//   clothesName: string;
//   imageId: string;
//   imageFile: File;
// }

interface UploadImageResponse {
  imageId: string;
  roomId: string;
  imageUrl: string;
}

// 이미지 추가
export const postUploadImage = async (
  formData: FormData,
  accessToken: string,
): Promise<UploadImageResponse> => {
  const { data } = await axiosInstance.post<UploadImageResponse>(
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
