import { catagoryList, subscriptionList } from "@/utils/apiServices";
import SubscribeComponentCPA from "@/components/Subscription/SubscribeCpa.view";
// 36ac474653b4a1e3840e62eeebd4411d2dbf61b9 last commit by sakib vai
import { Metadata } from "next";
import { cookies } from "next/headers";
import DynamicSubscriptionPack from "@/components/Subscription/static/subscription.type";
// import { DynamicSubscriptionPack } from "@/helpers/commonTypes";

export const metadata: Metadata = {
  title:
    "Kabbik App Subscription | Daily | Monthly | Half Yearly | Yearly Pack",
  description:
    "Listen more than 3000 + Bangla Audio book through subscribing your desire one.",
};

const Subscribe = async () => {
  const subscriptionPackList: DynamicSubscriptionPack[] = (
    await subscriptionList('web_cpa')
  ).data
    .sort(
      (a: DynamicSubscriptionPack, b: DynamicSubscriptionPack) =>
        Number(a.priority) - Number(b.priority)
    )
    // .filter((x: DynamicSubscriptionPack) => x.id !== 6);
  const categoryListData = await catagoryList();
      
  return (
    <SubscribeComponentCPA
      subscriptionPackList={subscriptionPackList}
      categoryListData={categoryListData}
    />
  );
};

export default Subscribe;
