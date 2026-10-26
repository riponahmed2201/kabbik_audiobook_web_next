"use client";

import styles from "./static/audioBook.module.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  addFavorite,
  deleteFavoritesApi,
  getDynamicPaymentMethods,
  paymentForPurchaseAudiobook,
  promocodeHandlerForBook,
  userProfile,
} from "@/utils/apiServices";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";
import { PageProps, UserProfileInfo } from "./static/audiobook.type";
import {
  BookIcon,
  Calendar,
  Clock,
  Headphones,
} from "lucide-react";
import {
  convertToBanglaDigits,
  formatHM,
  handleShare2,
  normalizeMsisdn,
  playCount,
  textSlice,
} from "@/helpers/commonFunction";
import LoveIcon from "@/svgs/LoveIcon";
import LinkIcon from "@/svgs/LinkIcon.svg";
import Tabs from "@/shared/ui/Tab/Tab.view";
import Review from "./Review.view";
import ShareIcon from "@/svgs/ShareIcon.svg";
import Star from "@/svgs/Star.svg";
import { container } from "@/shared/ui/static/tailwind.classes";
import Spinner from "@/shared/ui/Spinner.view";
import EpisodeList from "./EpisodeList.view";
import ListenInApp from "./ListenInApp.view";
import { paths } from "@/utils/Paths";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { ReduxShowLoginModal } from "@/features/auth/store/LoginSlice";
import { siteConfig } from "@/config/config";
import CityTouchPayment from "@/features/subscription/components/CityTouchPayment/CityTouchPayment.view";
import Crown from "@/svgs/Crown.svg";
import { Ads } from "@/features/entertainment/components/Ads/Ads";
import { InFeedAds } from "@/features/entertainment/components/Ads/InFeedAdd";
import GPNumberModal from "@/features/catalog/components/CategoryWiseBooks/GpModal";
import Biography from "./BiographyModal.view";

const CastAndCrew = dynamic(
  () => import("./Cast&Crew.viw"),
  { ssr: false, loading: () => <Spinner /> }
);

const CommonModal = dynamic(
  () => import("@/shared/ui/CommonModal/CommonModal.view"),
  { ssr: false, loading: () => <Spinner /> }
);

const PaymentOptions = dynamic(
  () =>
    import(
      "@/features/subscription/components/Subscription/PaymentOptions.view"
    ),
  { ssr: false, loading: () => <Spinner /> }
);

const AddReviewForm = dynamic(() => import("./AddReviewForm.view"), {
  ssr: false,
  loading: () => <Spinner />,
});

const AudiobookComponent = ({
  bookId,
  audiobookData,
  authorDetailsData,
  castData,
  reviewDetailsData,
}: PageProps) => {
  const audioBookDetailsData = audiobookData;
  const authorData = authorDetailsData?.data[0];
  const castCrewData = castData?.data;
  const [isFavorite, setIsFavorite] = useState(
    audioBookDetailsData?.is_favorite ?? false
  );
  const [expand, setExpand] = useState(false);
  const [userData, setUserData] = useState<UserProfileInfo | null>(null);
  const isSubscribed = userData?.is_subscribed === 1;
  const [paymentOptions, setPaymentOptions] = useState([]);
  const router = useRouter();
  const [showPayModal, setShowPayModal] = useState(false);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);
  const user = useAppSelector((store) => store?.user?.userData);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [isCityTouch, SetIsCityTouch] = useState(false);
  const affId = searchParams.get("affId");
  const affProductId = searchParams.get("productId");
  const affProductType = searchParams.get("productType");
  const [affIdValue, setAffIdValue] = useState<string | null>(null);
  const [reducedPrice, setReducedPrice] = useState(0);
  const reducedPriceRef = useRef(reducedPrice);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [number, setNumber] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isMsisdnTakerModalOpened, setIsMsisdnTakerModalOpened] =
    useState(false);

  const epList = audioBookDetailsData?.episodes ?? [];

  useEffect(() => {
    const sourceFromParams = Cookies.get("sourceFromParams") ?? "";
    const source = Cookies.get("source") ?? "";
    if (sourceFromParams === "city_touch" || source?.includes("city")) {
      SetIsCityTouch(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await userProfile();
      setUserData(data);
    };
    void fetchUserData();
  }, []);

  useEffect(() => {
    const divs = document.getElementsByClassName("modal-backdrop fade show");
    for (let i = 0; i < divs.length; i++) {
      if (divs[i].innerHTML === "") {
        divs[i].remove();
      }
    }
  });

  const hasAccess = (episodeIndex: number): boolean =>
    Boolean(
      (!audioBookDetailsData?.isSubRestricted && isSubscribed) ||
        (audioBookDetailsData?.isSubRestricted &&
          audioBookDetailsData?.for_rent === 0 &&
          isSubscribed) ||
        audioBookDetailsData?.isPurchased === 1 ||
        audioBookDetailsData?.price === 0 ||
        epList?.[episodeIndex]?.isfree
    );

  const hasListenAccess = hasAccess(0);

  const handlePrimaryAction = () => {
    if (!user?.id || user?.id === Number(siteConfig.defaultUserId)) {
      dispatch(ReduxShowLoginModal(true));
      return;
    }
    if (hasListenAccess) {
      return;
    }
    setShowPayModal(true);
  };

  useEffect(() => {
    reducedPriceRef.current = reducedPrice;
  }, [reducedPrice]);

  const makePayment = async (
    paymentName: string,
    url: string,
    _reducedPrice2?: number
  ) => {
    const currentReducedPrice = reducedPriceRef.current;
    const payload: Record<string, unknown> = {
      userId: userData?.id,
      name: userData?.full_name,
      phone: userData?.phone_no,
      address: userData?.address,
      amount: audioBookDetailsData.price - currentReducedPrice,
      audioBookId: audioBookDetailsData.id,
      type: "Audiobook",
      promo_code: affIdValue ?? "",
      productId: audioBookDetailsData.id,
      source: "Kabbik",
      platform: "web",
    };

    if (paymentName.toLocaleLowerCase() === "gpdcb" && number.trim() === "") {
      setIsMsisdnTakerModalOpened(true);
      setShowPaymentOptions(false);
      setPaymentMethod(paymentName);
      setPaymentUrl(url);
      return;
    }
    if (paymentName.toLocaleLowerCase() === "gpdcb") {
      payload.msisdn = normalizeMsisdn(number);
      payload.currency = "BDT";
      payload.purpose = "Rent Audiobook";
      payload.productName = "Kabbik- Audiobook Rent";
      payload.renewal = 0;
      payload.durationDay = 50;
      payload.promo_code = "";
      payload.source = "web";
      payload.trafficSource = "Kabbik";
      payload.platform = "app";
      payload.firstPayment = 1;
    }

    const result = await paymentForPurchaseAudiobook(url, payload);
    if (paymentName === "Bkash") {
      if (result.data?.bkashURL) {
        window.location.href = result.data.bkashURL;
        return;
      }
    } else {
      if (paymentName.toLocaleLowerCase() === "gpdcb" && result.url) {
        window.location.href = result.url;
        return;
      }
      if (result.data?.callBackUrl) {
        window.location.href = result.data.callBackUrl;
        return;
      }
    }
    toast.error("Could not make payment");
  };

  const purchaseAudiobook = async () => {
    if (!user?.id || user?.id === Number(siteConfig.defaultUserId)) {
      dispatch(ReduxShowLoginModal(true));
      setShowPayModal(false);
      return;
    }
    setShowPaymentOptions(true);
    const result = await getDynamicPaymentMethods("audiobook");
    const excludedPaymentMethods =
      audioBookDetailsData.excluded_payment_methods as string;
    if (result.success) {
      setPaymentOptions(
        result.data.filter(
          (p: { method_name: string }) =>
            !excludedPaymentMethods.includes(p.method_name)
        )
      );
    }
  };

  const removeHandler = async () => {
    setAffIdValue("");
    setReducedPrice(0);
    toast.info("Promo Code Removed!", { theme: "dark" });
  };

  const getDiscountedData = async (aff?: string | null) => {
    const promo = aff || affIdValue;
    const result = await promocodeHandlerForBook(
      audioBookDetailsData.id,
      promo ?? "",
      audioBookDetailsData?.price
    );
    if (result?.data?.reduce_price) {
      setReducedPrice(Number(result?.data?.reduce_price) ?? 0);
    }
  };

  useEffect(() => {
    Cookies.remove("affId");
    if (affId) {
      const expiresIn2Min = new Date(new Date().getTime() + 2 * 60 * 1000);
      Cookies.set("affId", affId, { expires: expiresIn2Min });
      Cookies.set("affProductId", affProductId ?? "", { expires: expiresIn2Min });
      Cookies.set("affProductType", affProductType ?? "", {
        expires: expiresIn2Min,
      });
    }
    const affIdFromCookies = Cookies.get("affId");
    setAffIdValue(affId ?? affIdFromCookies ?? null);
    if (affProductType === "book") {
      void getDiscountedData(affId ?? affIdFromCookies ?? null);
    }
  }, [affId, affProductId, affProductType]);

  const handleFavourite = async () => {
    if (!user?.id || user?.id === Number(siteConfig.defaultUserId)) {
      dispatch(ReduxShowLoginModal(true));
      return;
    }
    if (isFavorite) {
      const result = await deleteFavoritesApi(audioBookDetailsData.id);
      if (result?.success) {
        setIsFavorite(false);
        toast.info("Removed From Favorites");
      } else {
        toast.error("Something Went wrong");
      }
    } else {
      const result = await addFavorite(audioBookDetailsData.id);
      if (result?.id) {
        setIsFavorite(true);
        toast.success("Favorites Created successfully");
      } else {
        toast.error("Something Went wrong");
      }
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as Window & { dataLayer?: unknown[] }).dataLayer =
        (window as Window & { dataLayer?: unknown[] }).dataLayer || [];
      (window as Window & { dataLayer?: unknown[] }).dataLayer!.push({
        event: "view_item",
        content_type: "audiobook",
        content_id: audioBookDetailsData?.id,
        content_name: audioBookDetailsData?.name,
        content_category: audioBookDetailsData?.category_id,
        value: audioBookDetailsData?.price,
        currency: "BDT",
        author: audioBookDetailsData?.author_name,
      });
    }
  }, [audioBookDetailsData]);

  return (
    <>
      <ToastContainer />
      <div
        className={`absolute left-0 w-full mt-[-100px] ${styles.audioBookBg}`}
        style={{
          backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "140vh",
        }}
      />
      <div
        className={
          "flex flex-col md:flex-row justify-around mt-7 items-start relative " +
          container("1300px")
        }
      >
        <div className="circular_gradient left-0 bottom-[-10%] w-[35vw] h-[35vw] absolute rounded-[50%]" />
        <div className=" flex max-md:mx-auto mr-4 items-center z-[1] justify-center max-md:mb-4 md:p-1">
          <div className="w-full max-w-full min-w-[96vw] md:min-w-[30vw] md:max-w-[90%] md2:max-w-[80%] lg:max-w-[70%] md:max-h-[105vh] mx-auto">
            <div className="bg-[#E6F7FA] rounded-[8px] md2:rounded-[14px] overflow-hidden">
              <div className="relative m-3 md1:m-4 mb-0">
                <div
                  className="w-full min-w-[28vw] aspect-[516/540] rounded-[12px] overflow-hidden"
                  style={{
                    backgroundImage: `url('${bookId ? audioBookDetailsData?.thumb_path : ""}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "top left",
                  }}
                >
                  <div className="absolute top-4 right-4 flex items-center gap-2 cursor-pointer z-[4]">
                    <div
                      className={`w-8 h-8 ${isFavorite ? "bg-white/70" : "bg-red-500/50"} rounded-full flex items-center justify-center`}
                    >
                      <span
                        onClick={handleFavourite}
                        className="w-4 h-4 text-white fill-white"
                      >
                        <LoveIcon fill={isFavorite ? "#D14874" : "white"} />
                      </span>
                    </div>
                    <div
                      onClick={handleShare2}
                      className="w-8 h-8 rounded-full bg-gray-500/50 flex items-center justify-center"
                    >
                      <span className="w-4 h-4 text-white inline-block">
                        <ShareIcon />
                      </span>
                    </div>
                  </div>
                  <div className="absolute bg_opacity_gradient bottom-0 left-0 right-0 p-4 rounded-b-xl z-[5]">
                    <div className="text-center">
                      <h1 className=" text-[#f9f9f9] text-clg font-bold leading-[34px] mb-1">
                        {audioBookDetailsData?.name}
                      </h1>
                      <p className="text-white text-cn cursor-pointer leading-normal">
                        <Link
                          href={
                            paths?.authors + audioBookDetailsData?.author_name
                          }
                        >
                          {audioBookDetailsData?.author_name}
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-t-[32px] p-3 md2:px-6 pt-0">
                <div className="flex justify-between gap-6 mb-3">
                  <div className="flex items-center">
                    <Headphones className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    <span className="text-cs sm:text-cs2 mt-0 ml-1 font-medium text-gray-900">
                      {playCount(audioBookDetailsData?.play_count)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-gray-700" strokeWidth={2} />
                    <span className="text-cs md:text-cs2 ml-1 font-medium text-gray-900">
                      {formatHM(
                        audioBookDetailsData?.episodes?.reduce(
                          (a, c) => a + (c?.duration ?? 0),
                          0
                        )
                      )}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star />
                    <span className="text-cs md:text-cs2 ml-1 font-medium text-gray-900">
                      {audioBookDetailsData?.rating?.toFixed(1)}
                    </span>
                  </div>
                </div>

                {hasListenAccess ? (
                  <ListenInApp audiobookId={audioBookDetailsData.id} className="mb-4" />
                ) : (
                  <button
                    type="button"
                    onClick={handlePrimaryAction}
                    className="w-full mb-4 btn-gradient-2 text-gray-50 py-2 px-6 rounded-full text-cs2 font-semibold"
                  >
                    রেন্ট / সাবস্ক্রাইব করুন
                  </button>
                )}
                {!hasListenAccess && (
                  <ListenInApp
                    audiobookId={audioBookDetailsData.id}
                    variant="inline"
                    className="mb-4 justify-center"
                  />
                )}
              </div>

              <div className="space-y-3 px-3 pb-4 md2:px-6">
                <p className="text-black text-cs2 leading-relaxed">
                  <span className="font-semibold">কণ্ঠ: </span>
                  {audiobookData?.contributing_artists}
                </p>
                <div
                  onClick={() => setExpand(!expand)}
                  className="text-black text-cs2 cursor-pointer leading-relaxed max-h-56 overflow-y-auto"
                >
                  <span className="font-semibold">সংক্ষিপ্ত বিবরণী: </span>
                  {textSlice(
                    audiobookData?.description,
                    70,
                    false,
                    "এই বইটির সংক্ষিপ্ত বিবরণ এখানে দেওয়া হবে।"
                  )}
                  <span className=" text-deep_pink2 font-[600] ml-2">
                    আরো পড়ুন...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" z-[1] w-full md:w-[60%] xl:w-[60%]">
          <div className="max-w-[700px] bg-white/[99] p-4 rounded-[8px] w-[100%] mx-auto space-y-4">
            <div className="bg-gradient-to-r from-[#881D69] to-[#D34974] rounded-xl p-2 md:p-3 text-white">
              <div className="flex items-center gap-2 md:gap-4">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gray-300 flex-shrink-0 overflow-hidden">
                  <img
                    loading="lazy"
                    src={authorData?.imageUrl ?? ""}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <h1 className="text-cs2 md:text-cn font-medium">
                    <Link href={paths?.authors + authorData?.name}>
                      {authorData?.name}
                    </Link>
                  </h1>
                  <Link
                    href={paths?.authors + authorData?.name}
                    className="flex max-xxs:flex-col text-cs flex-row md:items-center justify-between gap-2 md:gap-4"
                  >
                    <div className="flex items-center gap-1">
                      <BookIcon className="w-4 md:w-4" />
                      <span className="text-cs md:text-cn font-medium">
                        {authorData?.total_audiobooks} অডিও বুক
                      </span>
                    </div>
                    <ListenInApp variant="inline" />
                  </Link>
                </div>
              </div>
            </div>

            <Tabs
              tabs={[
                {
                  name: "এপিসোড",
                  component: (
                    <EpisodeList book={audiobookData} hasAccess={hasAccess} />
                  ),
                },
                {
                  name: "কলা কুশলীরা",
                  component: (
                    <CastAndCrew castCrewData={castCrewData} />
                  ),
                },
                {
                  name: "রিভিউ",
                  component: (
                    <Review
                      handleReveiw={() => setShowAddReviewModal(true)}
                      reviews={reviewDetailsData?.data}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {showPayModal ? (
        <CommonModal
          isOpen={showPayModal}
          onClose={() => setShowPayModal(false)}
        >
          <div className="w-full max-w-[650px] p-4 pt-8 mt-4 rounded-[12px] bg-[#0F172B] relative">
            <div className="text-center mb-5">
              <h1 className="text-cn md:text-xl font-bold text-white">
                আপনার লিসেনিং প্ল্যান বেছে নিন
              </h1>
            </div>
            <div
              className={`grid ${audioBookDetailsData?.isSubRestricted ? "" : "xs2:grid-cols-2"} gap-3`}
            >
              <div className="bg-[#BC0974]/10 border-[1.5px] border-[#BC0974] rounded-xl p-1 xs2:p-5 flex flex-col items-center">
                <Calendar className="w-6 h-6 text-purple-300 mb-4" />
                <h2 className="text-base font-semibold text-white mb-1">
                  এই অডিওবুক টি রেন্ট নিন
                </h2>
                <p className="text-sm text-gray-300 mb-5">
                  {convertToBanglaDigits(
                    audioBookDetailsData?.rent_duration_in_month * 30
                  )}{" "}
                  দিন
                </p>
                <button
                  type="button"
                  onClick={purchaseAudiobook}
                  className="w-full pink_gradient rounded-[6px] text-white text-sm font-semibold py-1.5 xs2:py-3 px-4"
                >
                  রেন্ট নিন - TK{" "}
                  {convertToBanglaDigits(audioBookDetailsData?.price)}
                </button>
              </div>
              {!audioBookDetailsData?.isSubRestricted && (
                <div className="gradient_subscribe_10 border-[1.5px] border-orange-600 rounded-xl p-1 xs2:p-5 flex flex-col items-center">
                  <span className="w-8 h-8 inline-block mb-4">
                    <Crown />
                  </span>
                  <p className="text-sm text-gray-300 mb-1">সমস্ত অডিওবুকে </p>
                  <h2 className="text-base font-semibold text-white mb-5">
                    আনলিমিটেড অ্যাক্সেস
                  </h2>
                  <button
                    type="button"
                    onClick={() => router.push("/subscribe")}
                    className="w-full gradient_subscribe text-white text-sm font-semibold py-1.5 xs2:py-2 px-4 rounded-[8px]"
                  >
                    সাবস্ক্রাইব করুন
                  </button>
                </div>
              )}
            </div>
          </div>
        </CommonModal>
      ) : (
        ""
      )}

      <CommonModal
        isOpen={showPaymentOptions}
        onClose={() => setShowPaymentOptions(false)}
      >
        <div
          className={`${styles.modalBody} bg-navyblue modal-body text-center max-h-[96vh] overflow-y-scroll`}
        >
          {isCityTouch ? (
            <CityTouchPayment
              options={[]}
              subscriptionPackId={1}
              price={audioBookDetailsData?.price ?? 0}
              reducePrice={0}
              bookId={audioBookDetailsData?.id}
            />
          ) : (
            <PaymentOptions
              options={paymentOptions.map((option: { method_name: string; image_url: string; url: string; vat: number }) => ({
                methodName: option.method_name,
                logoUrl: option.image_url,
                apiUrl: option.url,
                vat: option.vat,
              }))}
              callback={(name, url, discountFromChild) =>
                makePayment(name, url, discountFromChild as number)
              }
              removePromocodeHandler={removeHandler}
              promoData={affIdValue as string}
              addPromocodeHandler={getDiscountedData}
              setPromoData={(value) => {
                setAffIdValue((prev) => {
                  const prevStr = prev ?? "";
                  return typeof value === "function" ? value(prevStr) : value;
                });
              }}
              price={audioBookDetailsData?.price - Number(reducedPrice)}
              reducePrice={reducedPrice}
              isPromocodeApplied={reducedPrice > 0}
              discountPriceFromChild={true}
            />
          )}
        </div>
      </CommonModal>

      <CommonModal
        isOpen={showAddReviewModal}
        onClose={() => setShowAddReviewModal(false)}
      >
        <AddReviewForm
          onClose={() => setShowAddReviewModal(false)}
          book={audioBookDetailsData}
        />
      </CommonModal>

      <CommonModal isOpen={expand} onClose={() => setExpand(false)}>
        <Biography
          heading="সংক্ষিপ্ত বিবরণী:"
          text={audiobookData?.description}
        />
      </CommonModal>

      <CommonModal
        isOpen={isMsisdnTakerModalOpened}
        onClose={() => setIsMsisdnTakerModalOpened(false)}
      >
        <GPNumberModal
          value={number}
          setValue={setNumber}
          handleSubmit={() => makePayment(paymentMethod, paymentUrl)}
        />
      </CommonModal>

      {user?.is_subscribed !== 1 && <Ads slotId={3361836254} />}
      {user?.is_subscribed !== 1 && (
        <InFeedAds slotId={1249366126} layoutKey="-fb+5w+4e-db+86" />
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(AudiobookComponent), {
  ssr: false,
});
