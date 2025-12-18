export type InstagramPostProps = {
  id: string
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  media_url: string
  timestamp: string // ✅ ISO string from API
  caption?: string
}
