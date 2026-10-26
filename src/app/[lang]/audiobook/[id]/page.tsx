
import PageNotFound from "@/shared/ui/NotFound.view";
import { audioBookDetails } from "@/features/audiobook/api/server";
import  {RatingReviewInfo, AuthorInfo, castCrewInfo, PageProps } from "@/features/audiobook/components/audiobook/static/audiobook.type";
import { authorDetails, castDetails, ratingReviewList } from "@/features/catalog/api";
import { getDictionary } from "../../dictionaries";
import { AudiobookComponent } from "@/features/audiobook";

export const metadata = {
  title: "Audiobook details | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

const Audiobook = async ({
  params,
}: {
  params: Promise<{ id: string; lang: "en" | "bn" }>;
}) => {
  const { id } = await params;
  const bookId = parseInt(id);
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
        />
      )}
            

    </>
  );
};

export default Audiobook;
