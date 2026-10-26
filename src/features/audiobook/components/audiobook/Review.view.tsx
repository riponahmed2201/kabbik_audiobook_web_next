import Star from "@/svgs/Star.svg";
import CommonButton from "@/shared/ui/button";
import Rating from "@/shared/ui/CustomRating/CustomRating.view";
import HalfStar from "@/svgs/HalfStar.svg";
import { RatingReviewInfo } from "./static/audiobook.type";
import { decodeWord } from "@/helpers/commonFunction";
import styles from './static/audioBook.module.css'
import { useEffect } from "react";


export default function Review({reviews,handleReveiw}:{reviews:RatingReviewInfo[],handleReveiw:()=>void}) {
 
  // useEffect(()=>{//console.log(reviews,"rerr")},[])
  return (
    <div className="  ">
      <div className="max-w-2xl mx-auto">
        {/* Add Review Button */}
        <div className="mb-6 sm:mb-2">
          <CommonButton   className={styles.add_review_btn} handleClick={handleReveiw}>
            অ্যাড রিভিউ
          </CommonButton>
        </div>

        {/* Review List */}
        <div className="space-y-2.5  max-h-[54.5vh] pr-3 overflow-y-auto">
          {reviews.map((review,index) => (
            <div
                key={index}
                className={
                    "flex px-3 bg-gray-50 border border-gray-300 rounded-[12px] py-1 justify-start items-start gap-3 sm:gap-4 w-full"
                    // "rounded-xl bg-white shadow-[0_1px_4px_1px_rgba(0,0,0,0.25)]"
                    }
                >
                {/* Profile Image */}
                <div className="flex-shrink-0">
                    <img
                    loading="lazy"
                    src={review.image_url || "https://kabbik-space.sgp1.cdn.digitaloceanspaces.com/kabbik-images/manPlaceholder.jpg"}
                    alt={review.full_name}
                    className="w-12 h-12 sm:w-[50px] sm:h-[50px] rounded-full object-cover"
                    />
                </div>

                {/* Review Content */}
                <div className="flex flex-col gap-3 flex-1 min-w-0">
                    {/* Header with name, rating, and date */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <h3 className="text-cn font-normal text-black leading-2 truncate">
                        {review?review.full_name:''}
                    </h3>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Rating
                          value={review?.rating}
                          // onChange={()=>{}}
                          // step={0.1}
                          max={5}
                          min={1}
                          fullIcon={()=><span className="w-5 h-5 inline-block"><Star/></span>}
                          // emptyIcon={()=><Star/>}
                          halfIcon={()=><span className="w-4 h-4 inline-block"><HalfStar/></span>}
                          // sizeClasses="w-7 h-7"
                          fillClassName="text-amber-500"
                          emptyClassName="text-gray-300 dark:text-gray-700"
                        />
                        <span className="text-xs font-normal text-black leading-5 ml-2">
                        {review?.rating}
                        </span>
                    </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-xs font-normal text-black leading-[18px]">
                    {decodeWord(review?.review)}
                    </p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
