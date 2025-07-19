"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { getAllCategories } from "@/services/courseCategoryService";
import { searchCourse } from "@/services/courseService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { CourseCard } from "@/components/course/CourseCard";
import Pagination from "@/components/pagination/Pagination";
import FiltersSidebar from "@/components/filters/FiltersSidebar";
import FiltersToggler from "@/components/filters/FiltersToggler";
import type { ICourse } from "../../interfaces/ICourse";

const PAGE_SIZE = 12;
const MIN_PRICE = 0;
const MAX_PRICE = 2000;

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prevParams = useRef<string>(null);
  useHydrateAuth();

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const [filters, setFilters] = useState({
    rating: 0,
    selectedCategory: "",
    levels: {
      "All levels": false,
      Beginner: false,
      Intermediate: false,
      Advanced: false,
    },
    priceRange: [MIN_PRICE, MAX_PRICE] as [number, number],
  });

  const fetchFilteredCourses = useCallback(
    async (params: URLSearchParams) => {
      try {
        setLoading(true);
        params.set("limit", PAGE_SIZE.toString());
        const { data, hasMore, matches } = await searchCourse(
          params.toString()
        );
        setCourses(data);
        setHasMore(hasMore);
        setTotalCourses(matches);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    },
    [courses.length]
  );

  const updateFilter = useCallback(
    debounce(async (key: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      value ? params.set(key, value) : params.delete(key);
      params.delete("page");
      router.replace(`?${params.toString()}`, { scroll: false });
      setPageNum(1);
      await fetchFilteredCourses(params);
    }, 300),
    [searchParams, router, fetchFilteredCourses]
  );

  const updatePageParam = useCallback(
    async (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      page === 1 ? params.delete("page") : params.set("page", String(page));
      router.replace(`?${params.toString()}`, { scroll: false });
      setPageNum(page);
      await fetchFilteredCourses(params);
    },
    [searchParams, router, fetchFilteredCourses]
  );

  // Initialize and filter handlers
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const dbCategories = await getAllCategories();
        setCategories(dbCategories.map((cat: any) => cat.title));
      } catch (err) {
        console.error("Categories error:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const paramsString = params.toString();

    if (paramsString !== prevParams.current) {
      fetchFilteredCourses(params);
      prevParams.current = paramsString;

      // Sync filters from URL
      const urlFilters = {
        rating: Number(params.get("minRating")) || 0,
        selectedCategory: params.get("category") || "",
        levels: parseLevels(params.get("level")),
        priceRange: [
          Number(params.get("minPrice")) || MIN_PRICE,
          Number(params.get("maxPrice")) || MAX_PRICE,
        ] as [number, number],
      };
      setFilters(urlFilters);
      setPageNum(Number(params.get("page")) || 1);
    }
  }, [searchParams, fetchFilteredCourses]);

  const resetFilters = useCallback(() => {
    setFilters({
      rating: 0,
      selectedCategory: "",
      levels: {
        "All levels": false,
        Beginner: false,
        Intermediate: false,
        Advanced: false,
      },
      priceRange: [MIN_PRICE, MAX_PRICE],
    });
    setPageNum(1);
    router.replace("?", { scroll: false });
  }, [router]);

  const numOfPages = Math.ceil(totalCourses / PAGE_SIZE);
  const memoizedCourses = useMemo(() => courses, [courses]);

  return (
    <div className="space-y-[2rem] mx-[7.5rem] p-[3rem] bg-surface rounded-[1.25rem]">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl text-primary-text font-bold">Search Results</h1>
        <div className="flex items-center gap-4">
          {totalCourses > 0 && (
            <span className="text-base text-primary-text font-normal">
              {totalCourses} courses
            </span>
          )}
          <FiltersToggler onClick={() => setIsSidebarOpen(true)} />
        </div>
      </div>

      <FiltersSidebar
        isSidebarOpen={isSidebarOpen}
        changeSidebarOpen={setIsSidebarOpen}
        resetFilters={resetFilters}
        rating={filters.rating}
        changeRating={(e) => updateFilter("minRating", e.target.value || null)}
        categories={categories}
        selectedCategory={filters.selectedCategory}
        changeCategory={(e) => updateFilter("category", e.target.value || null)}
        levels={filters.levels}
        changeLevels={(e) => {
          const updated = { ...filters.levels };
          if (e.target.name === "All levels") {
            const value = !filters.levels["All levels"];
            Object.keys(updated).forEach(
              (l) => (updated[l as keyof typeof updated] = value)
            );
          } else {
            updated[e.target.name as keyof typeof updated] = e.target.checked;
            updated["All levels"] = false;
          }
          const selected = Object.entries(updated)
            .filter(([l, c]) => c && l !== "All levels")
            .map(([l]) => l.toLowerCase());
          updateFilter("level", selected.length ? selected.join(",") : null);
        }}
        minValue={filters.priceRange[0]}
        maxValue={filters.priceRange[1]}
        min={MIN_PRICE}
        max={MAX_PRICE}
        handleMinChange={(e) => {
          const value = parseInt(e.target.value);
          setFilters((prev) => ({
            ...prev,
            priceRange: [
              Math.min(value, prev.priceRange[1] - 1),
              prev.priceRange[1],
            ],
          }));
          updateFilter("minPrice", value > 0 ? String(value) : null);
        }}
        handleMaxChange={(e) => {
          const value = parseInt(e.target.value);
          setFilters((prev) => ({
            ...prev,
            priceRange: [
              prev.priceRange[0],
              Math.max(value, prev.priceRange[0] + 1),
            ],
          }));
          updateFilter("maxPrice", value > 0 ? String(value) : null);
        }}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[30rem]">
          <span className="loading loading-ring loading-6xl text-primary-text"></span>
        </div>
      ) : memoizedCourses.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-4">
            {memoizedCourses.map((course) => (
              <CourseCard course={course} key={course.id} />
            ))}
          </ul>
          {numOfPages > 1 && (
            <div className="flex justify-center py-[0.5rem]">
              <Pagination
                currentPage={pageNum}
                totalPages={numOfPages}
                onPrevious={() => updatePageParam(Math.max(pageNum - 1, 1))}
                onNext={() => hasMore && updatePageParam(pageNum + 1)}
                onPageChange={updatePageParam}
              />
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center min-h-[30rem]">
          <p className="text-2xl text-primary-text">No courses found</p>
        </div>
      )}
    </div>
  );
}

function parseLevels(levelParam?: string | null) {
  const defaultLevels = {
    "All levels": false,
    Beginner: false,
    Intermediate: false,
    Advanced: false,
  };

  if (!levelParam) return defaultLevels;

  return levelParam.split(",").reduce(
    (acc, lvl) => {
      const normalized =
        lvl.charAt(0).toUpperCase() + lvl.slice(1).toLowerCase();
      if (normalized in acc) {
        acc[normalized as keyof typeof acc] = true;
      }
      return acc;
    },
    { ...defaultLevels }
  );
}
