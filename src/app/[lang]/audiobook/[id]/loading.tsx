import Spinner from "@/shared/ui/Spinner.view";

export default function AudiobookLoading() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <Spinner size="w-10 h-10" />
    </div>
  );
}
