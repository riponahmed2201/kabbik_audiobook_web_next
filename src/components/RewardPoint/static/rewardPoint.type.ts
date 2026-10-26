export type TPointEarningWay={
    "taskId":string;
    "leading_icon":string;
    "leading_icon2":string;
    "title":string;
    "point":string;
}[]

export type RewardHistory = {
  reward_title: string;
  usage_point: number;
  offer: string;
  is_used: number; // 0 or 1
  is_expired: number; // 0 or 1
  remaining_days: number;
  created_at: string; // ISO date string
};

export type RewardHistoryList = RewardHistory[];

export type TEarnedRewardRecord = {
  id: number;
  user_id: number;
  task_id: number;
  point: number;
  status: number;
  ui_additional_info: {
    title: string;
    sub_title: string;
    short_description: string;
  };
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

