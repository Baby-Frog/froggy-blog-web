import { TSuccessApiResponse } from "./response.types";
import { TUser } from "./user.types";

export type TAuthResponse = TSuccessApiResponse<{ accessToken: string; refreshToken: string; user: TUser }>;
