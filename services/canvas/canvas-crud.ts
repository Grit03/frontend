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
): Promise<CanvasData> => {
  const { data } = await axiosInstance.post("/clothes/create", formData);
  return data;
};

// 디자인 캔버스 조회
export const getDesignCanvas = async (
  clothesName: string,
): Promise<CanvasData> => {
  const { data } = await axiosInstance.get(`/clothes/name/${clothesName}`);
  return data;
};

// 모든 캔버스 조회
export const getAllDesignCanvas = async (): Promise<CanvasData[]> => {
  try {
    const { data } = await axiosInstance.get("/clothes/view");
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// 특정 캔버스 삭제
export const deleteDesignCanvas = async (clothesName: string) => {
  const response = await axiosInstance.delete(`/clothes/name/${clothesName}`);
  return response;
};

// 캔버스 이름 수정
export const putRenamingCanvas = async (formData: RenameFormData) => {
  const { data } = await axiosInstance.put(`/clothes/change-name`, formData);
  return data;
};
