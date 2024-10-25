import { axiosInstance } from "../axios-instance";

interface AiFormData {
  clothesName: string;
  imageId: string;
  designStyle:
    | "none"
    | "line-art-style"
    | "vintage-style"
    | "graffiti-style"
    | "pop-art-style"
    | "geometric-style"
    | "hand-drawn-style"
    | "3D-style"
    | "collage-style"
    | "watercolor-style";
  prompt: string;
}

// 프롬프트 이미지 생성
export const postImageGenerating = async (formData: AiFormData) => {
  const response = await axiosInstance.post("/clothes/image/generate", {});
  console.log(response);
};
