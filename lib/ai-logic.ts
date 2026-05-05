export function generateAdsFromURL(url: string) {
  const domain = url.replace("https://", "").replace("http://", "").split("/")[0];

  const keywords = [
    domain,
    "buy online",
    "best price",
    "shop now",
    "limited offer",
  ];

  const headlines = [
    `Best Deals on ${domain}`,
   `Buy from ${domain} Today`,
    `Top Products at ${domain}`,
  ];

  const descriptions = [
    `Shop premium products from ${domain}. Limited time offer!`,
    `Get the best deals only on ${domain}. Fast delivery.`,
  ];

  return {
    keywords,
    headlines,
    descriptions,
  };
}