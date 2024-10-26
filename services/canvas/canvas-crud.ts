import { CanvasData } from "@/types/data";
import { axiosInstance } from "../axios-instance";

export interface NameFormData {
  clothesName: string;
}

export interface RenameFormData {
  oldClothesName: string;
  newClothesName: string;
}

// 디자인 캔버스 생성
export const postCreatingRoom = async (
  formData: NameFormData,
  accessToken: string,
): Promise<CanvasData> => {
  const { data } = await axiosInstance.post("/clothes/create", formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// 디자인 캔버스 조회
export const getDesignCanvas = async (
  clothesName: string,
  accessToken: string,
): Promise<CanvasData> => {
  const { data } = await axiosInstance.get(`/clothes/name/${clothesName}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};

// 모든 캔버스 조회
export const getAllDesignCanvas = async (
  accessToken: string,
): Promise<CanvasData[]> => {
  try {
    const { data } = await axiosInstance.get("/clothes/view", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 특정 캔버스 삭제
export const deleteDesignCanvas = async (
  clothesName: string,
  accessToken: string,
) => {
  const response = await axiosInstance.delete(`/clothes/name/${clothesName}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response;
};

// 캔버스 이름 수정
export const putRenamingCanvas = async (
  formData: RenameFormData,
  accessToken: string,
) => {
  const { data } = await axiosInstance.put(`/clothes/change-name`, formData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return data;
};
