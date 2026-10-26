import React, { useEffect } from "react";
import styles from "./static/freeTrail.module.css";
import DynamicSubscriptionPack from "./static/subscription.type";
import { addDaysToCurrentDate, convertToBanglaDigits, formatDateToBengali } from "@/helpers/commonFunction";

export default function FreeTrialMessage({onSubmit,handleClose,data}:{
    onSubmit:()=>void,
    handleClose:()=>void,
    data:DynamicSubscriptionPack | null;
}) {

  useEffect(()=>{//console.log(data,'bata');
  },[])
  return (
    <div className={styles.card}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>সাবস্ক্রিপশন বিবরণ</h2>
        <p className={styles.date}>{data?.bn_name}</p>
      </div>

      {/* Info Table */}
      <table className={styles.table}>
        <tbody>
          <tr>
            <td>ফ্রি ট্রায়াল চার্জ</td>
            <td>০ টাকা</td>
          </tr>
          <tr>
            <td>পরবর্তী পেমেন্ট</td>
            <td>{formatDateToBengali(addDaysToCurrentDate(data?.free_trial_in_day??0))}</td>
          </tr>
          <tr>
            <td>নবায়ন চার্জ</td>
            <td>{convertToBanglaDigits(data?.rawPrice??0)} টাকা</td>
          </tr>
          <tr>
            <td>বিলিং সাইকেল</td>
            <td>{convertToBanglaDigits(data?.days??0)} দিন</td>
          </tr>
        </tbody>
      </table>

      <p className={styles.autoRenew}>{!data?.isOnetime? `(অটো-রিনিউয়াল)`:''}</p>

      {/* Notes */}
      <div className={styles.notes}>
        <p className={styles.cancel}>❌ ক্যানসেলেশন: বিকাশ অ্যাপের মাধ্যমে যেকোনো সময় সাবস্ক্রিপশন বাতিল করা যাবে।</p>
        <p className={styles.info}>ℹ️ নোট: {formatDateToBengali(addDaysToCurrentDate(data?.free_trial_in_day??0))}-এর আগে সাবস্ক্রিপশন বাতিল করলে কোনো চার্জ কাটা হবে না।</p>
      </div>

      {/* Buttons */}
      <div className={styles.buttons}>
        <button 
        onClick={handleClose} 
        className={styles.cancelBtn}>বাতিল</button>
        <button 
        onClick={onSubmit} 
        className={styles.continueBtn}>কন্টিনিউ</button>
      </div>

      <p className={styles.footer}>📞 সাহায্যের জন্য বিকাশ সাপোর্ট অথবা অ্যাপ দেখুন</p>
    </div>
  );
}