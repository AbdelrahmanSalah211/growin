"use client";
import { getAllCategories } from "@/services/courseCategoryService";
import { useAuthStore } from "@/stores/authStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getCourses, searchCourse } from "@/services/courseService";
import { useHydrateAuth } from "@/hooks/useHydrateAuth";
import { Icourse } from "./Icourse";
import FiltersSidebar from "@/components/Filters/FiltersSidebar";
import { CourseCard } from "@/components/courseCard";
import Pagination from "@/components/pagination/Pagination";

export default function SearchPage() {
  useHydrateAuth();
  const accessToken = useAuthStore((state) => state.token) || "";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [courses, setCourses] = useState<Icourse[]>([]);

  const [rating, setRating] = useState(0);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [levels, setLevels] = useState({
    "All levels": false,
    Beginner: false,
    Intermediate: false,
    Advanced: false,
  });
  const min = 0;
  const max = 2000;
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const fetchFilteredCourses = async (params: URLSearchParams) => {
    try {
      if(!accessToken) return;
      const  {data}  = await searchCourse(accessToken,params.toString())
      setLoadingCategories(false)
      setLoadingCourses(false)
      setCourses(data);
      setPageNum(1);
    } catch (err) {
      console.error(err);
    }
  };

  const updateFilter = async (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    await fetchFilteredCourses(params);
  };

  const changeRating = async (e: ChangeEvent<HTMLInputElement>) => {
    const newRating = +e.target.value;
    setRating(newRating);
    await updateFilter("minRating", newRating > 0 ? String(newRating) : null);
  };

  const changeCategory = async (e: ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    await updateFilter("category", category);
  };

  const changeLevels = async (e: ChangeEvent<HTMLInputElement>) => {
    const updatedLevels = { ...levels };
    if (e.target.name === "All levels") {
      const value = !levels["All levels"];
      Object.keys(updatedLevels).forEach(
        (level) => (updatedLevels[level as keyof typeof updatedLevels] = value)
      );
    } else {
      updatedLevels[e.target.name as keyof typeof updatedLevels] =
        e.target.checked;
    }
    setLevels(updatedLevels);

    const selectedLevels = Object.entries(updatedLevels)
      .filter(([level, checked]) => checked && level !== "All levels")
      .map(([level]) => level);

    await updateFilter(
      "level",
      selectedLevels.length > 0 ? selectedLevels.join(",").toLowerCase() : null
    );
  };

  const handleMinChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const adjustedValue = value >= maxValue ? maxValue - 1 : value;
    setMinValue(adjustedValue);
    await updateFilter(
      "minPrice",
      adjustedValue > 0 ? String(adjustedValue) : null
    );
  };

  const handleMaxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const adjustedValue = value <= minValue ? minValue + 1 : value;
    setMaxValue(adjustedValue);
    await updateFilter(
      "maxPrice",
      adjustedValue > 0 ? String(adjustedValue) : null
    );
  };

  const resetFilters = async () => {
    if (!accessToken) return;
    try {
      const resetCourses = await getCourses(accessToken);
      setCourses(resetCourses);
      setRating(0);
      setSelectedCategory("");
      setLevels({
        "All levels": false,
        Beginner: false,
        Intermediate: false,
        Advanced: false,
      });
      setMinValue(min);
      setMaxValue(max);
      router.replace("?", { scroll: false });
    } catch (err) {
      console.error(err);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const changeSidebarOpen = (tof: boolean) => setIsSidebarOpen(tof);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!accessToken) {
          setLoadingCategories(false);
          return;
        }
        const dbCategories = await getAllCategories(accessToken);
        const categoryTitles = dbCategories.map((cat: any) => cat.title);
        setCategories(categoryTitles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (!accessToken) return;

    // Check if filters exist
    const hasFilters =
      params.has("minRating") ||
      params.has("category") ||
      params.has("level") ||
      params.has("minPrice") ||
      params.has("maxPrice");

    // Only fetch all courses if there are no filters
    if (hasFilters) {
      fetchFilteredCourses(params);
      return;
    }

    const fetchCourses = async () => {
      try {
        const dbCourses = await getCourses(accessToken);
        setCourses(dbCourses);
        setLoadingCourses(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, [accessToken, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.toString() === "") return;

    const minRating = params.get("minRating");
    if (minRating) setRating(Number(minRating));

    const category = params.get("category");
    if (category) setSelectedCategory(category);

    const levelParam = params.get("level");
    if (levelParam) {
      const levelArr = levelParam.split(",");
      const updatedLevels = {
        "All levels": false,
        Beginner: false,
        Intermediate: false,
        Advanced: false,
      };
      levelArr.forEach((lvl) => {
        const normalized = lvl[0].toUpperCase() + lvl.slice(1).toLowerCase();
        if (normalized in updatedLevels) {
          updatedLevels[normalized as keyof typeof updatedLevels] = true;
        }
      });
      setLevels(updatedLevels);
    }

    const minPrice = params.get("minPrice");
    if (minPrice) setMinValue(Number(minPrice));
    const maxPrice = params.get("maxPrice");
    if (maxPrice) setMaxValue(Number(maxPrice));
    fetchFilteredCourses(params);
  }, [searchParams]);

  const pageitems = 6;
  const numOfPages = Math.ceil(courses.length / pageitems);
  const [pageNum, setPageNum] = useState(1);
  const start = (pageNum - 1) * pageitems;
  const end = start + pageitems;

  const nextPage = () => {
    if (pageNum < numOfPages) setPageNum((prev) => prev + 1);
  };
  const prevPage = () => {
    if (pageNum > 1) setPageNum((prev) => prev - 1);
  };

  const pageCourses = courses.slice(start, end);
  console.log(loadingCategories, loadingCourses);
  if (loadingCategories || loadingCourses) {
    return (
      <div className="flex justify-center items-center min-h-[30rem]">
        <span className="loading loading-ring loading-6xl text-primary-text"></span>
      </div>
    );
  }

  return (
    <div className="px-[7.5rem] py-[2.5rem]">
      <FiltersSidebar
        isSidebarOpen={isSidebarOpen}
        changeSidebarOpen={changeSidebarOpen}
        resetFilters={resetFilters}
        rating={rating}
        changeRating={changeRating}
        categories={categories}
        selectedCategory={selectedCategory}
        changeCategory={changeCategory}
        levels={levels}
        changeLevels={changeLevels}
        minValue={minValue}
        maxValue={maxValue}
        min={min}
        max={max}
        handleMinChange={handleMinChange}
        handleMaxChange={handleMaxChange}
      />

      <div className="px-[1.875rem] grid grid-cols-3 gap-[2.5rem] py-[2.5rem]">
        {pageCourses.map((course) => (
          <CourseCard
            title={course.title}
            description={course.description}
            courseCover={course.courseCover}
            level={course.level}
            price={course.price}
            key={course.id}
          />
        ))}
      </div>

      {numOfPages > 1 && (
        <div className="flex justify-center py-[0.5rem]">
          <Pagination
            pageNum={pageNum}
            previous={prevPage}
            next={nextPage}
            numOfPages={numOfPages}
          />
        </div>
      )}
      {courses.length<1&&(
        <p className="w-full text-center text-primary-text text-4xl py-[20rem]">
          No courses found.
        </p>
      )}
    </div>
  );
}
