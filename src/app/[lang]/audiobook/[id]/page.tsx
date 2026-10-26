import { Suspense } from "react";
import Spinner from "@/shared/ui/Spinner.view";
import { AudiobookPageContent } from "./AudiobookPageContent";

export const instant = false;

export const metadata = {
  title: "Audiobook details | Kabbik",
  description: "Learn more about Kabbik and our story.",
};

function AudiobookFallback() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size="w-10 h-10" />
    </div>
  );
}

const Audiobook = async ({
  params,
}: {
  params: Promise<{ id: string; lang: "en" | "bn" }>;
}) => {
  const { id } = await params;

  return (
    <Suspense fallback={<AudiobookFallback />}>
      <AudiobookPageContent id={id} />
    </Suspense>
  );
};

export default Audiobook;
