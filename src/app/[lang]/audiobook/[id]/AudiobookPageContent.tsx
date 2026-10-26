import PageNotFound from "@/shared/ui/NotFound.view";
import { audioBookDetails } from "@/features/audiobook/api/server";
import {
  RatingReviewInfo,
  castCrewInfo,
  PageProps,
} from "@/features/audiobook/components/audiobook/static/audiobook.type";
import { authorDetails, castDetails, ratingReviewList } from "@/features/catalog/api";
import { AudiobookComponent } from "@/features/audiobook";

type AudiobookPageContentProps = {
  id: string;
};

export async function AudiobookPageContent({ id }: AudiobookPageContentProps) {
  const bookId = parseInt(id, 10);
  const audiobookData: any = await audioBookDetails(bookId);

  if (!audiobookData || audiobookData.success === "false") {
    return <PageNotFound />;
  }

  const authorName = audiobookData.author_name;
  const castName = audiobookData.contributing_artists;

  const [authorData, castData, reviewData]: [
    PageProps["authorDetailsData"],
    { data: castCrewInfo[] },
    { data: RatingReviewInfo[] },
  ] = await Promise.all([
    authorDetails(authorName),
    castDetails(castName),
    ratingReviewList(bookId),
  ]);

  return (
    <AudiobookComponent
      audiobookData={audiobookData}
      bookId={bookId}
      authorDetailsData={authorData}
      castData={castData}
      reviewDetailsData={reviewData}
    />
  );
}
