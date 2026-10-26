export interface ReferralData {
  animated_image: string;
  benefit: string[];
  sharable_content: string;
  unsubscribed_user_content: string[];
  withdrawal_amounts: WithdrawalAmount[];
  sharable_image_url: string;
  copy_widget_title: string;
  copyContent: string;
}

export interface WithdrawalAmount {
  title_amount: string;
  amount: string; // keep as string since your JSON values are quoted
}

export type TClaimHistory = {
  data: {
    status: "PENDING" | "DELIVERED" | "CANCELLED" | string; // extend if more statuses possible
    feedback: string | null;
    award_type: string;
    amount: number;
    created_at: string; // ISO date string
  }[];
  summary: {
    totalClaim: number;
    totalDelivered: number;
    totalPending: number;
  };
};

export type tEarnSummay={
  balance_amount:number,
  minimum_withdrawal_amount:number,
  maximum_withdrawal_amount:number,
}

export type TAward = {
  amount: number;
  award_type: string;
  created_at: string; // ISO date string (e.g., "2025-10-28T01:55:28.000Z")
  feedback: string | null;
  status: "PENDING" | "CANCELLED" | "DELIVERED" ; // extend as needed
};

export type TAwards = TAward[];