export type RewardData = {
    user_tier: {
      tier_id: number;
      name: string;
      min_point: number;
      max_point: number;
      user_id: number;
      user_name: string;
      user_acquired_point: number;
      user_balance_point: number;
    };
    featureList: {
      leading_icon: string;
      leading_icon2: string;
      title: string;
      trailing_title: string | null;
      type_reward: string;
      trailing_icon: string | null;
      is_child_exsits: boolean;
      child_limit: number;
      goto_page: string;
      items: (
        | FeatureItems
        | {
            taskId: number;
            leading_icon: string;
            leading_icon2: string;
            title: string;
            point: number;
          }
      )[];
    }[];
  };

 export type FeatureItems={
    id: number;
    tier_id: number;
    title: string;
    after_claim_expire_in_day: number;
    icon_path: string;
    icon_path2: string;
    offer_id: number | null;
    offer_title: string | null;
    description: string | null;
    user_info_screen_title: string | null;
    required_user_info_input_field:  {
      title: string;
      hint: string;
      keyName: string;
      emptyErrorMessage: string;
      isRequired: boolean;
    } | null;
    reward_type: string | null;
    greeting_message: string;
    required_point: number;
  }

export type TFaq={
  question:string;
  answer:string;
}


export type RewardItemProps = (FeatureItems | { taskId: number; leading_icon: string;leading_icon2: string; title: string; point: number; })[] | undefined

// (
//          FeatureItems
        
//       )[];


type Tier = {
  id: number;
  name: string;
  min_point: number;
  max_point: number;
  rewards: FeatureItems[];
};


export type TiersResponse = Tier[];

export type TTopCardProps={
  full_name:string;
  user_balance_point:number,
  min_point:number;
  user_acquired_point:number;
  max_point:number;
  tier_name:string
}


type UserInfoField = {
  title: string;
  hint: string;
  keyName: string;
  emptyErrorMessage?: string;
  maxLine?: number;
  isRequired?: boolean;
};

export type UserInfoFields = UserInfoField[];
