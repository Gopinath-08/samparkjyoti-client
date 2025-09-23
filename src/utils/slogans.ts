// Slogans for different roles and pages
export interface SloganData {
  odia: string;
}

// Role-based slogans
export const roleSlogans: Record<string, SloganData> = {
  labour: {
    odia: "ଘର ପାଖରେ, ପରିବାର ସାଥିରେ"
  },
  farmer: {
    odia: "ଜୟ ଯବାନ୍, ଜୟ କିଶାନ୍"
  },
  employer: {
    odia: "କମ୍ ମୂଲ୍ୟ, ଶ୍ରମିକ ଅମୂଲ୍ୟ"
  },
  buyer: {
    odia: "ସିଧା ଚାଷୀଙ୍କ ଠାରୁ"
  },
  agent: {
    odia: "ସମ୍ପର୍କ ଜ୍ୟୋତି, ଆପଣଙ୍କ ସେବାରେ"
  }
};

// Page-based slogans
export const pageSlogans: Record<string, SloganData> = {
  market: {
    odia: "ସିଧା ଚାଷୀଙ୍କ ଠାରୁ"
  },
  ustad: {
    odia: "ରୋଜଗାର ସହ କୌଶଳ ବିକାଶ"
  }
};

// Common slogans
export const commonSlogans = {
  platformName: {
    odia: "ସମ୍ପର୍କ ଜ୍ୟୋତି"
  }
};

// Utility functions
export const getRoleSlogan = (role: string): SloganData => {
  return roleSlogans[role] || {
    odia: ""
  };
};

export const getPageSlogan = (page: string): SloganData => {
  return pageSlogans[page] || {
    odia: ""
  };
};

export const getCommonSlogan = (type: keyof typeof commonSlogans): SloganData => {
  return commonSlogans[type];
};
