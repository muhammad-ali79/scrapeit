"use client";
import { check } from "@/libs/queries";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    searchTerm ? params.set("query", searchTerm) : params.delete("query");
    replace(`${pathName}/${params.toString()}`);
  }, 300);

  return (
    <div>
      <input
        type="text"
        placeholder="Filter Tracked Products"
        className="w-20 rounded-full bg-secondary placeholder:mr-6 placeholder:text-gray-200"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}

export default Search;

export function ClientButton() {
  const handler = async () => {
    await check();
  };
  return <button onClick={handler}>get your user</button>;
}
