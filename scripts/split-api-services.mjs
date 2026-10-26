import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const srcPath = path.join(root, "src/shared/api/apiServices.monolith.bak.ts");
const src = fs.readFileSync(srcPath, "utf8");

const preambleEnd = src.indexOf("export const subscriptionPack");
const preamble = src.slice(0, preambleEnd);
let body = src.slice(preambleEnd);
body = body.replace(
  /\n  export const promocodeHandlerForBook/,
  "\nexport const promocodeHandlerForBook"
);

function extractExports(source) {
  const exportStart = /^\s*export (?:async )?(?:const|function) \w+/gm;
  const indices = [];
  let m;
  while ((m = exportStart.exec(source)) !== null) {
    indices.push(m.index);
  }
  const blocks = [];
  for (let i = 0; i < indices.length; i++) {
    const start = indices[i];
    const end = i + 1 < indices.length ? indices[i + 1] : source.length;
    let code = source.slice(start, end).trimEnd();
    // trim trailing blank lines
    code = code.replace(/\n{3,}$/, "\n");
    const nameMatch = code.match(/^\s*export (?:async )?(?:const|function) (\w+)/);
    if (nameMatch) blocks.push({ name: nameMatch[1], code });
  }
  return blocks;
}

const blocks = extractExports(body);

const featureMap = {
  auth: [
    "loginWithPassword",
    "logout",
    "getDeviceList",
    "postVerifyOtp",
    "postSendOtp",
    "postSendOtpOlder",
    "postLoginApi",
    "postLoginApi1",
    "postGoogleLogin",
    "postFacebookLogin",
    "setPasswordApi",
    "accountDeletion",
    "getUserProfile",
    "getSessionInit",
    "getSessionLog",
    "debuggerLog",
    "testGet",
    "testPost",
  ],
  profile: [
    "getPreferenceData",
    "updateProfile",
    "updateUser",
    "userProfile",
    "userSummary",
    "userContinue",
    "favoriteAudiobook",
    "postFavoritesApi",
    "deleteFavoritesApi",
    "addFavorite",
    "getPurchasedAudiobooks",
    "getAllCourse",
    "bkashPurchaseCourse",
    "getPurchasedCourse",
    "sponsor_request",
    "postBookRequest",
    "create_preference",
    "getAuthors",
    "getMembershipData",
    "book_finished_stats",
    "uploadFile",
    "get_continue_listen_data",
    "continueListeningPostApi",
  ],
  subscription: [
    "subscriptionPack",
    "paymentMethodlist",
    "bkashUnSubscribeUserApi",
    "robiUnSubscribeUserApi",
    "gpUnsubscribeApi",
    "robiPostApi",
    "blDcbPostApi",
    "blDcbVerifyApi",
    "blDcbUnsubscribeApi",
    "gpPostApi",
    "bkashOfferYearly",
    "bkashOneTimePostApi",
    "bkashPostApi",
    "paymentForPurchaseAudiobook",
    "nagadPurchaseAudiobook",
    "nagadPostApi",
    "upayPostApi",
    "aamarpayPostApi",
    "paymentVerify",
    "getPromoCodeApi",
    "redeemCodePostApi",
    "subscriptionList",
    "subs_page_trackerApi",
    "bkashOfferHalfYearly",
    "getDynamicPaymentMethods",
    "makeDynamicPayment",
    "payWithBkashOneTime",
    "payWithBkashRecurring",
    "payWithRobi",
    "payWithGP",
    "promocodeHandlerV2",
    "promocodeHandlerForBook",
    "cityBankApiTest",
  ],
  player: [
    "postEpisodePlayCountApi",
    "postAudiobookPlayCountApi",
    "getCurrentEpisodePath",
  ],
  home: [
    "user_total_listening_time",
    "homeListData",
    "topBanner",
    "premiumList",
    "promoBannerList",
    "categorySuggestions",
    "fetchDataFromJson",
    "academicList",
    "upcomingList",
    "leaderboard_top_listners",
    "continue_listen_stat_post",
    "getStoreProducts",
  ],
  catalog: [
    "podcastList",
    "freeAudiobookList",
    "authorDetails",
    "authorEpisodes",
    "castDetails",
    "castEpisodes",
    "homeCatagoryItems",
    "catagoryItemList",
    "catagoryList",
    "getCategoryData",
    "postSearch",
    "ratingReviewList",
  ],
  audiobook: ["postReview", "audioBookDetailsClient"],
  playlist: [
    "RemoveBooksFromPlaylist",
    "addBooksToPlaylistFolders",
    "getPlayListBooks",
    "createNewPlaylistFolders",
    "updatePlaylistFolders",
  ],
  rewards: [
    "claim_reward",
    "create_reward",
    "all_tier_reward",
    "getUser_reward_profile",
    "reward_faq",
    "reward_tasks",
    "user_point_details",
  ],
  referEarn: [
    "fetchReferAndEarn",
    "insert_earn_log",
    "user_earning",
    "user_claim_history",
    "get_total_earn",
    "get_refer_history",
    "claim_request",
  ],
  quiz: ["join_quizes", "submit_quizes", "get_Quizes", "prevMatches", "getWinners"],
  notification: [
    "getNotifications",
    "unreadNotificationCount",
    "MakeReadNotification",
    "NewsLetterNotificationSubs",
  ],
  entertainment: ["gamezop_stat_tracker"],
  blog: ["postBlog"],
};

const byName = Object.fromEntries(blocks.map((b) => [b.name, b.code]));

const assigned = new Set(Object.values(featureMap).flat());
for (const { name } of blocks) {
  if (!assigned.has(name)) {
    console.error("Unassigned export:", name);
    process.exit(1);
  }
}
for (const name of assigned) {
  if (!byName[name]) {
    console.error("Missing export in source:", name);
    process.exit(1);
  }
}

const adjustedPreamble = preamble
  .replace('from "./apiEndpoints"', 'from "@/shared/api/apiEndpoints"')
  .replace('from "./CommonApicalls"', 'from "@/shared/api/CommonApicalls"')
  .replace('from "@/components/ui/static/types"', 'from "@/shared/ui/static/types"')
  .replace(
    'from "@/components/Profile/static/profile.type"',
    'from "@/features/profile/components/Profile/static/profile.type"'
  );

for (const [feature, names] of Object.entries(featureMap)) {
  const dir = path.join(root, "src/features", feature, "api");
  fs.mkdirSync(dir, { recursive: true });
  const chunk = names.map((n) => byName[n]).join("\n\n\n");
  fs.writeFileSync(path.join(dir, "api.ts"), adjustedPreamble + chunk + "\n", "utf8");
  fs.writeFileSync(
    path.join(dir, "index.ts"),
    names.map((n) => `export { ${n} } from "./api";`).join("\n") + "\n",
    "utf8"
  );
}

fs.writeFileSync(
  path.join(root, "src/shared/api/apiServices.ts"),
  Object.keys(featureMap)
    .map((f) => `export * from "@/features/${f}/api";`)
    .join("\n") + "\n",
  "utf8"
);
console.log("Split", blocks.length, "exports");
