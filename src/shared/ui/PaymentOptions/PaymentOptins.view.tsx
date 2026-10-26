import { MutableRefObject, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./static/payment.module.css";
import Link from "next/link";
import { toast } from "react-toastify";
import { BicepsFlexed, Check, DiscAlbumIcon } from "lucide-react";
import Spinner from "../Spinner.view";

type Option = {
  methodName: string;
  logoUrl: string;
  apiUrl: string;
  vat: number;
};

type PaymentOptionsProps = {
  options: Option[];
  callback?: (methodName: string, apiUrl: string) => Promise<void>;
  callbacks?: { methodName: string; payment: () => Promise<void> }[];
  promoData?: string;
  setPromoData?: React.Dispatch<React.SetStateAction<string>>;
  isPromocodeApplied?: boolean;
  addPromocodeHandler?: () => Promise<void>;
  removePromocodeHandler?: () => Promise<void>;
  price?: number;
  reducePrice?: number;
  isMsisdnSubmitted?: MutableRefObject<boolean>;
  setIsMsisdnTakerModalOpened?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PaymentOptions = ({
  options,
  callback,
  callbacks,
  promoData,
  setPromoData,
  isPromocodeApplied,
  addPromocodeHandler,
  removePromocodeHandler,
  price,
  reducePrice,
  isMsisdnSubmitted,
  setIsMsisdnTakerModalOpened,
}: PaymentOptionsProps) => {
  const [isLoading,setIsLoading]=useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [termsPrivacyAgreed, setTermsPrivacyAgreed] = useState(false);


  
  const payNow = useCallback(async () => {
    if (!termsPrivacyAgreed) {
      toast.error(
        "To continue payment you need to accept 'terms and condition' & 'refund policy'"
      );
      return;
    }
    setIsLoading(true)
    if (callback) {
      await callback?.(selectedOption?.methodName!, selectedOption?.apiUrl!);
    } else {
      switch (selectedOption?.methodName) {
        case "bkash":
          await callbacks?.find((v) => v.methodName === "bkash")?.payment?.();
          break;
        case "bkashOnetime":
          await callbacks
            ?.find((v) => v.methodName === "bkashOnetime")
            ?.payment?.();
          break;
        case "nagad":
          await callbacks?.find((v) => v.methodName === "nagad")?.payment?.();
          break;
        case "upay":
          await callbacks?.find((v) => v.methodName === "upay")?.payment?.();
          break;
        case "robi":
          await callbacks?.find((v) => v.methodName === "robi")?.payment?.();
          break;
        case "surjopay":
          await callbacks
            ?.find((v) => v.methodName === "surjopay")
            ?.payment?.();
          break;
        case "GPDCB":
          if (isMsisdnSubmitted?.current) {
            await callbacks?.find((v) => v.methodName === "GPDCB")?.payment?.();
          } else {
            setIsMsisdnTakerModalOpened?.(true);
          }
          break;
        case "BLDCB":
            await callbacks?.find((v) => v.methodName === "BLDCB")?.payment?.();
          
          break;
        case "stripe":
          toast.error("Try again later");
          break;
        default:
          toast.error("Select another payment method");
      }
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption,termsPrivacyAgreed]);

  return (
    <>
      {callbacks !== undefined ? (
        <div className="text-white">
          <div style={{ textAlign: "left", marginBottom: "7px" }}>
            Want to use any promocode?
          </div>
          <div className={`${styles.promocodeGroup}`}>
            <div>
              <DiscAlbumIcon className="fs-24" />
            </div>
            <input
              type="text"
              className={`${styles.control}`}
              placeholder="Type a promocode"
              value={promoData}
              onChange={(e) => setPromoData?.(e.target.value)}
            />
            <button
              className={`${styles.promocodeSubmit} fs-24 d-flex align-items-center`}
              id="button-addon2"
              onClick={
                !isPromocodeApplied
                  ? addPromocodeHandler
                  : removePromocodeHandler
              }
            >
              {!isPromocodeApplied ? (
                <Check className="fs-32 text-success" />
              ) : (
                <BicepsFlexed className="fs-32 text-danger" />
              )}
            </button>
          </div>
          {isPromocodeApplied ? (
            <div className="mt-1 fs-14 text-start">
              You are saving{" "}
              <span className="fw-bolder" style={{ color: "#11af37" }}>
                {reducePrice}
              </span>{" "}
              Tk by using this promo code
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="d-flex flex-column gap-2">
        {options.map((option: any, index: number) => (
          <label
            key={index}
            className="form-check-label text-white"
            htmlFor={`flexRadioDefault${index + 1}`}
          >
            <div
              className={`${styles.option} form-check px-3  mx-auto rounded d-flex align-items-center`}
            >
              <div>
                <input
                  className="form-check-input"
                  style={{ marginLeft: "0px", marginTop: "0px" }}
                  type="radio"
                  name="flexRadioDefault"
                  id={`flexRadioDefault${index + 1}`}
                  checked={
                    selectedOption?.methodName === option.methodName
                      ? true
                      : false
                  }
                  onChange={() => {
                    setSelectedOption(option);
                    // if (!termsPrivacyAgreed) {
                    //   toast.error(
                    //     "To continue payment you need to accept 'terms and condition' & 'refund policy'"
                    //   );
                    // } else {
                    //   setSelectedOption(option);
                    // }
                  }}
                />
              </div>
              <div
                style={{
                  width: "120px",
                  height: "60px",
                  // margin: "0 10px 0 10px",
                }}
              >
                <Image
                //   loader={imageLoader}
                  src={option.logoUrl||''}
                  alt={option.methodName}
                  width={0}
                  height={0}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              {/* <div>{formatPaymentName(option.methodName)}</div> */}
              <div
                style={{
                  marginLeft: "auto",
                  textAlign: "right",
                }}
              >
                <div>BDT {price + (option.vat ?? 0)}</div>
                {option.vat ? (
                  <div className="fs-12">{option.extraChargeFor}</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </label>
        ))}
      </div>
      <label htmlFor="termsPrivacy" className="d-flex align-items-start">
        <input
          id="termsPrivacy"
          style={{ marginRight: "8px", marginTop: "3px" }}
          type="checkbox"
          checked={termsPrivacyAgreed}
          onChange={(evt) => setTermsPrivacyAgreed(!termsPrivacyAgreed)}
        />
        <div className="text-white fs-12">
          I agree with{" "}
          <Link href={"/terms&condition"} className="text-primary">
            terms and condition
          </Link>{" "}
          &{" "}
          <Link href={"/returnpolicy"} className="text-primary">
            refund policy
          </Link>
        </div>
      </label>
      <button
        id={styles.payNowButton}
        className="green-gradient-1"
        disabled={!selectedOption || isLoading}
        onClick={payNow}
      >
        {isLoading?(
          <Spinner
            color="primary"
            size="sm"
            // style={{marginRight:'5px'}}
          >
            {/* Loading... */}
          </Spinner>
        ):''}
        {!isMsisdnSubmitted?.current ? "Pay" : "Continue"}
      </button>
    </>
  );
};

export default PaymentOptions;
