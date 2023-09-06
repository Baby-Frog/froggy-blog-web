import { TSuccessApiResponse } from "./response.types";
import { TUser } from "./user.types";

export type TAuthResponse = TSuccessApiResponse<{ access_token: string; refresh_token: string; user: TUser }>;
