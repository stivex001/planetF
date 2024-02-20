export type UserProfile = {
  _id: string;
  news: string;
  user: {
    photo: string;
    user_name: string;
    status: string;
    referral_plan: string;
    bvn: boolean;
  };
  balances: {
    wallet: string;
    bonus: string;
    points: string;
    agent_commision: string;
    general_market: string;
  };
  others: {
    banner: string;
  };
};
