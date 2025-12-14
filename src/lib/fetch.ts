import axios from "axios";

type InstagramRefreshResponse = {
  access_token: string;
  token_type: string;
  expires_in: number; // seconds
};

export const refreshToken = async (token: string) => {
  try {
    const { data } = await axios.get<InstagramRefreshResponse>(
      `${process.env.INSTAGRAM_BASE_URL}/refresh_access_token`,
      {
        params: {
          grant_type: "ig_refresh_token",
          access_token: token,
        },
      }
    );

    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    return {
      accessToken: data.access_token,
      expiresAt,
    };
  } catch (error) {
    console.error("Instagram token refresh failed:", error);
    throw new Error("Failed to refresh Instagram token");
  }
};
