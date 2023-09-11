import { TSuccessApiResponse } from "./response.types";
import { TUserProfile } from "./user.types";

export type TAuthResponse = TSuccessApiResponse<{ accessToken: string; refreshToken: string; profile: TUserProfile }>;
