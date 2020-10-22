import { UploadRes } from "../types/upload";
import { api } from "./api";

export const uploadImage = async (file: File | null | undefined) => {
  if (!file) return null;

  const form = new FormData();

  form.append("image", file, file.name);

  const res = await api.request<UploadRes[]>({
    method: "POST",
    url: "/image/upload",
    headers: {
      "content-type":
        "multipart/form-data; boundary=---011000010111000001101001",
    },
    data: form,
  });

  return res;
};
