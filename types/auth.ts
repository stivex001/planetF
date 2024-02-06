export type UserProfile = {
  _id: string;
  user: {
    photo: string;
    user_name: string;
    status: string;
    referral_plan: string;
  };
  balances: {
    wallet: string;
    bonus: string;
    points: string;
    agent_commision: string;
    general_market: string;
  };
  others: {
    banner: string
  }
};
