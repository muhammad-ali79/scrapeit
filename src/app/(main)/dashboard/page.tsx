import Pagination from "@/components/pagination";
import Search from "@/components/search";
import ValidateProductUrl from "@/components/validateProductUrl";
import Card from "@/components/card";
import { getFilteredTrackedProducts } from "@/libs/queries";
import { ClientButton } from "@/components/search";

async function Page({
  searchParams,
}: {
  searchParams?: {
    page?: string;
    query?: string;
  };
}) {
  return (
    <div className="px-10">
      <ValidateProductUrl />

      <div
        // {`${getFilteredTrackedProducts.length < 1 ? "hidden" : "block"}`}
        className=""
      >
        <Search />
        <Pagination />
        <ClientButton />
      </div>
    </div>
  );
}

export default Page;
