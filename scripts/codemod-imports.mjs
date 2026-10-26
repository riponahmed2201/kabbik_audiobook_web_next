import fs from "fs";
import path from "path";

const root = path.join(import.meta.dirname, "..", "src");

const replacements = [
  [/@\/components\/ui\//g, "@/shared/ui/"],
  [/@\/components\/CommonTabs\//g, "@/shared/misc/CommonTabs/"],
  [/@\/components\/Layout\//g, "@/features/layoutShell/components/Layout/"],
  [/@\/components\/PageLoader\//g, "@/features/layoutShell/components/PageLoader/"],
  [/@\/components\/RedirectComponent\//g, "@/features/layoutShell/components/RedirectComponent/"],
  [/@\/components\/twak\//g, "@/features/layoutShell/components/twak/"],
  [/@\/components\/Home\//g, "@/features/home/components/Home/"],
  [/@\/components\/CategoryWiseBooks\//g, "@/features/catalog/components/CategoryWiseBooks/"],
  [/@\/components\/category\//g, "@/features/catalog/components/category/"],
  [/@\/components\/audiobook\//g, "@/features/audiobook/components/audiobook/"],
  [/@\/components\/GlobalAudioPlayer\//g, "@/features/player/components/GlobalAudioPlayer/"],
  [/@\/components\/VideoPlayer\//g, "@/features/player/components/VideoPlayer/"],
  [/@\/components\/Login\//g, "@/features/auth/components/Login/"],
  [/@\/components\/Fblogin\//g, "@/features/auth/components/Fblogin/"],
  [/@\/components\/SessionProvider\//g, "@/features/auth/components/SessionProvider/"],
  [/@\/components\/Subscription\//g, "@/features/subscription/components/Subscription/"],
  [/@\/components\/CityTouchPayment\//g, "@/features/subscription/components/CityTouchPayment/"],
  [/@\/components\/Profile\//g, "@/features/profile/components/Profile/"],
  [/@\/components\/Preferences\//g, "@/features/profile/components/Preferences/"],
  [/@\/components\/MyPlayList\//g, "@/features/playlist/components/MyPlayList/"],
  [/@\/components\/RewardPoint\//g, "@/features/rewards/components/RewardPoint/"],
  [/@\/components\/ReferAndEarn\//g, "@/features/referEarn/components/ReferAndEarn/"],
  [/@\/components\/QuizCard\//g, "@/features/quiz/components/QuizCard/"],
  [/@\/components\/Notification\//g, "@/features/notification/components/Notification/"],
  [/@\/components\/ElaborateBlog\//g, "@/features/blog/components/ElaborateBlog/"],
  [/@\/components\/Entertainment\//g, "@/features/entertainment/components/Entertainment/"],
  [/@\/components\/Reels\//g, "@/features/entertainment/components/Reels/"],
  [/@\/components\/Ads\//g, "@/features/entertainment/components/Ads/"],
  [/@\/components\/about\//g, "@/features/about/components/about/"],
  [/@\/components\/Skeleton\//g, "@/shared/ui/"],
  [/@\/store\/slicers\/LoginSlice/g, "@/features/auth/store/LoginSlice"],
  [/@\/store\/slicers\/DeviceListSlice/g, "@/features/auth/store/DeviceListSlice"],
  [/@\/store\/slicers\/userSlice/g, "@/features/profile/store/userSlice"],
  [/@\/store\/slicers\/userPreferenceSlice/g, "@/features/profile/store/userPreferenceSlice"],
  [/@\/store\/slicers\/categoriesSlice/g, "@/features/catalog/store/categoriesSlice"],
  [/@\/store\/slicers\/PlaylistSlice/g, "@/features/playlist/store/PlaylistSlice"],
  [/@\/store\/slicers\/GlobalAudioPlayerSlice/g, "@/features/player/store/GlobalAudioPlayerSlice"],
  [/@\/store\/slicers\/staticTextSlice/g, "@/features/home/store/staticTextSlice"],
  [/@\/utils\/server-api/g, "@/shared/api/server-api"],
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(tsx?|css|jsx?)$/.test(ent.name)) out.push(p);
  }
  return out;
}

let changed = 0;
for (const file of walk(root)) {
  let text = fs.readFileSync(file, "utf8");
  let next = text;
  for (const [from, to] of replacements) next = next.replace(from, to);
  if (next !== text) {
    fs.writeFileSync(file, next);
    changed++;
  }
}
console.log("Updated", changed, "files");
