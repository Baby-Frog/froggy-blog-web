import axios from "axios";
import { ENDPOINTS } from "src/constants/endpoints";
import http from "src/utils/http";

export const storyApi = {
  uploadImage: (body: FormData) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.post<any>(ENDPOINTS.UPLOAD_IMAGE, body, {
      data: body,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  uploadImageIBB: (body: FormData) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    axios.post<any>(import.meta.env.VITE_IBB_IMAGE_UPLOAD_API_URL, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};
