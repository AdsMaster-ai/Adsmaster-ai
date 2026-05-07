export const generateAI = (data: any) => {
  const bt = data.businessType;
  const city = data.city;

  return {
    campaignName: `${bt} ${city} Campaign`,
    headline1: `Best ${bt} ${city}`.slice(0, 30),
    headline2: `Affordable ${bt}`.slice(0, 30),
    headline3: `Call Now`.slice(0, 30),

    desc1: `Get best ${bt} services in ${city}`.slice(0, 90),
    desc2: `Trusted by 500+ clients`.slice(0, 90),

    keywords: [
      { text: `best ${bt.toLowerCase()}`, match: "phrase" },
      { text: `${bt.toLowerCase()} near me`, match: "broad" },
      { text: `affordable ${bt.toLowerCase()}`, match: "exact" },
    ],
  };
};