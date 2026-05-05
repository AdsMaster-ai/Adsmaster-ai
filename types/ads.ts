// adsmaster-ai/types/ads.ts

export interface AdsCampaign {
  id: string;
  name: string;
  status: "ENABLED" | "PAUSED" | "REMOVED";
  channelType: string;
  impressions: number;
  clicks: number;
  costMicros: number;
  conversions: number;
  ctr: number;
  avgCpc: number;
}

export interface AdsAccount {
  customerId: string;
  name: string;
  currencyCode: string;
  connectedAt: number;
}