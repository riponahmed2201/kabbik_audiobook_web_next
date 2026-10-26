
import PageNotFound from "@/components/ui/NotFound.view";
import { audioBookDetails } from "@/utils/server-api";
import  {RatingReviewInfo, AuthorInfo, castCrewInfo, PageProps } from "@/components/audiobook/static/audiobook.type";
import { authorDetails, castDetails, ratingReviewList } from "@/utils/apiServices";
import { getDictionary } from "../../dictionaries";
import GradientAudioPlayer from "@/components/ui/AudioPlayer.view";
import AudiobookComponent from "@/components/audiobook/BookDetails.view";

export const metadata = {
  title: "Audiobook details | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const Audiobook = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; lang: "en" | "bn" }>;
  searchParams: Promise<{ episodeId?: string; time?: string }>;
}) => {
  const { id } = await params;
  const sp = await searchParams;
  const bookId = parseInt(id);
  const episodeId = parseInt(sp.episodeId ?? "0");
  const time = parseInt(sp.time ?? "0");
  const audiobookData: any = await audioBookDetails(bookId);
  // const authorData: PageProps['authorDetailsData'] = await authorDetails(authorName);
  // const castData: {data:castCrewInfo[]} = await castDetails(castName);
  // const reviewData: {data:RatingReviewInfo[]} = await ratingReviewList(bookId);
  const authorName:any = audiobookData.author_name;
  const castName:any = audiobookData.contributing_artists;
  
  const [  authorData, castData, reviewData]:[
    PageProps['authorDetailsData'],{data:castCrewInfo[]},{data:RatingReviewInfo[]}
  ] = await Promise.all([
    authorDetails(authorName),
    castDetails(castName),
    ratingReviewList(bookId),
  ]);
  
  // const { lang } =  await params;
  // const dict = await getDictionary(lang) 
  const doesAudiobookExist = audiobookData.success === "false";
  //console.log(castData,"castData")
  
  return (
    <>
      {doesAudiobookExist ? (
        <PageNotFound />
      ) : (
        <AudiobookComponent
          audiobookData={audiobookData}
          bookId={bookId}
          authorDetailsData={authorData}
          castData={castData}
          reviewDetailsData={reviewData}
          episodeId={episodeId}
          runningTime={time}
        />
      )}
            

    </>
  );
};

export default Audiobook;
