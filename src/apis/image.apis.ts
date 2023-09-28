import axios from "axios";
import { IMAGE_ENPOINTS } from "src/constants/endpoints";
import http from "src/utils/http";

export const imageApi = {
  uploadImage: (body: FormData) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    http.post<any>(IMAGE_ENPOINTS.UPLOAD_IMAGE, body, {
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
