interface DynamicSubscriptionPack {
  accessible_content: string;
  amount: string;
  bkashOnetime: number;
  bkashSubscription: number;
  canApplyPromo: number;
  country: string;
  created_at: Date | string;
  days: number;
  free_trial_in_day:number;
  msisdn?: string;
  description: string;
  DynamicSubscriptionPack:number;
  banner_name?:string;
  title?:string;
  dynamicPrice: string;
  excluded_payment_methods: string | null;
  frequency: string;
  globalPrice: string;
  base_amount_bn:string;
  googlePay: number;
  id: number;
  isOnetime: number;
  length: string;
  nagadOnetime: number;
  name: string;
  priority: string;
  rawPrice: number;
  recommendation: string;
  redeem: number;
  sku: string;
  status: string;
  subscriptionItemId: string;
  surjoPay: number;
  bn_name:string;
  benefit:TBenefits;
  updated_at: null;
  vat: number;
  subtitle?:string;
  reduce_price?:number|null;
  promo_code?:string|null;
  is_free_trail?:boolean;
}

type TBenefits={title:string,sub_title:string}[]

export default DynamicSubscriptionPack;
