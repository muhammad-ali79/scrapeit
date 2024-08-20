"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Pagination: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const setUrl = (page: number): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`${pathName}?${params.toString()}`);
  };

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      setUrl(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    setUrl(currentPage + 1);
  };

  return (
    <div className="flex items-center gap-x-8">
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className="rounded-full bg-accent px-8 py-3 text-lg font-semibold"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="rounded-full bg-accent px-8 py-3 text-lg font-semibold"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
