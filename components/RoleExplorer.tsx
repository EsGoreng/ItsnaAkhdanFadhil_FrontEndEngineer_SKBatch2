"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Department, Role } from "@/types/role";
import { MOCK_ROLES } from "@/data/roles";
import { RoleCard } from "./RoleCard";
import { RoleCardSkeleton } from "./RoleCardSkeleton";
import { EmptyState } from "./EmptyState";
import { RoleDetailModal } from "./RoleDetailModal";
import { BackToTop } from "./BackToTop";
import { RoleSidebar } from "./RoleSidebar";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, MotionConfig } from "motion/react";

const BATCH_SIZE = 6;

export function RoleExplorer() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("Semua");
  const [activeModalRole, setActiveModalRole] = useState<Role | null>(null);

  // Lazy loading states
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  // Compute total counts per department from raw mock data
  const departmentCounts = useMemo(() => {
    const counts: Record<Department, number> = {
      Semua: MOCK_ROLES.length,
      Engineering: 0,
      Product: 0,
      Design: 0,
      "Data & AI": 0,
      Marketing: 0,
      "People & Operations": 0,
      "Legal & Compliance": 0,
    };

    MOCK_ROLES.forEach((role) => {
      if (counts[role.department] !== undefined) {
        counts[role.department]++;
      }
    });

    return counts;
  }, []);

  // Filter roles based on selected department, search query, and level
  const filteredRoles = useMemo(() => {
    return MOCK_ROLES.filter((role) => {
      // 1. Department filter
      if (selectedDepartment !== "Semua" && role.department !== selectedDepartment) {
        return false;
      }

      // 2. Level filter
      if (selectedLevel !== "Semua" && role.level !== selectedLevel) {
        return false;
      }

      // 3. Search query filter
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = role.title.toLowerCase().includes(query);
        const matchesSummary = role.summary.toLowerCase().includes(query);
        const matchesDept = role.department.toLowerCase().includes(query);
        const matchesSkill = role.skills.some((s) => s.toLowerCase().includes(query));
        const matchesLocation = role.location.toLowerCase().includes(query);

        if (!matchesTitle && !matchesSummary && !matchesDept && !matchesSkill && !matchesLocation) {
          return false;
        }
      }

      return true;
    });
  }, [selectedDepartment, searchQuery, selectedLevel]);

  // When filters or search change, simulate smooth loading state & reset visible count
  useEffect(() => {
    setIsFiltering(true);
    setVisibleCount(BATCH_SIZE);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [selectedDepartment, searchQuery, selectedLevel]);

  // Sliced roles currently visible
  const visibleRoles = useMemo(() => {
    return filteredRoles.slice(0, visibleCount);
  }, [filteredRoles, visibleCount]);

  const hasMore = visibleCount < filteredRoles.length;
  const remainingCount = Math.max(0, filteredRoles.length - visibleCount);
  const nextBatchCount = Math.min(BATCH_SIZE, remainingCount);

  // Trigger loading next batch of items
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredRoles.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + BATCH_SIZE, filteredRoles.length));
      setIsLoadingMore(false);
    }, 550);
  }, [isLoadingMore, visibleCount, filteredRoles.length]);

  // IntersectionObserver for automatic lazy loading as user scrolls
  useEffect(() => {
    if (!hasMore || isLoadingMore || isFiltering) return;

    const currentObserverTarget = observerTargetRef.current;
    if (!currentObserverTarget) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleLoadMore();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "150px",
      }
    );

    observer.observe(currentObserverTarget);

    return () => {
      observer.disconnect();
    };
  }, [hasMore, isLoadingMore, isFiltering, handleLoadMore]);

  const isFilteringActive =
    selectedDepartment !== "Semua" || searchQuery.trim() !== "" || selectedLevel !== "Semua";

  const handleResetFilters = () => {
    setSelectedDepartment("Semua");
    setSearchQuery("");
    setSelectedLevel("Semua");
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar Filter Component */}
        <RoleSidebar
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          departmentCounts={departmentCounts}
          totalRolesCount={MOCK_ROLES.length}
          filteredRolesCount={filteredRoles.length}
          isFilteringActive={isFilteringActive}
          onResetFilters={handleResetFilters}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 w-full flex flex-col gap-6">
          {/* Header Bar */}
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {selectedDepartment === "Semua"
                  ? "Semua Lowongan Peran"
                  : `Departemen: ${selectedDepartment}`}
              </h2>
              <Badge variant="secondary" className="px-2.5 py-0.5 font-semibold">
                {filteredRoles.length} posisi
              </Badge>
            </div>
          </div>

          {/* Cards Grid: Skeletons, Actual Cards, or Empty State */}
          {isFiltering ? (
            // Skeleton state during filter / search transition
            <MotionConfig reducedMotion="user">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: Math.min(BATCH_SIZE, filteredRoles.length || BATCH_SIZE) }).map((_, index) => (
                  <motion.div
                    key={`filter-skeleton-${index}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    className="h-full"
                  >
                    <RoleCardSkeleton />
                  </motion.div>
                ))}
              </div>
            </MotionConfig>
          ) : filteredRoles.length > 0 ? (
            <div className="flex flex-col gap-8">
              {/* Card Grid with Motion Animations */}
              <MotionConfig reducedMotion="user">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AnimatePresence mode="popLayout">
                    {visibleRoles.map((role, index) => (
                      <motion.div
                        key={role.id}
                        layout
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                          delay: Math.min((index % BATCH_SIZE) * 0.05, 0.25),
                        }}
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="h-full"
                      >
                        <RoleCard
                          role={role}
                          onViewDetails={setActiveModalRole}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Skeleton placeholders when lazy-loading the next batch */}
                  {isLoadingMore &&
                    Array.from({ length: nextBatchCount || 2 }).map((_, index) => (
                      <motion.div
                        key={`lazy-skeleton-${index}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, delay: index * 0.05 }}
                        className="h-full"
                      >
                        <RoleCardSkeleton />
                      </motion.div>
                    ))}
                </div>
              </MotionConfig>

              {/* Lazy Load Sentinel & Manual Fallback Trigger */}
              {hasMore && (
                <div
                  ref={observerTargetRef}
                  className="py-6 flex flex-col items-center justify-center gap-3 text-center"
                >
                  {isLoadingMore ? (
                    <Badge variant="outline" className="gap-2 px-4 py-2 text-xs font-medium">
                      <Loader2 className="size-3.5 animate-spin text-primary" />
                      <span>Memuat {nextBatchCount} peran berikutnya dengan lazy load...</span>
                    </Badge>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleLoadMore}
                        className="gap-2"
                      >
                        <span>Muat Lebih Banyak Posisi (+{remainingCount} tersisa)</span>
                      </Button>
                      <span className="text-[11px] text-muted-foreground">
                        Atau scroll ke bawah untuk memuat otomatis (Lazy Load)
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <EmptyState
                selectedDepartment={selectedDepartment}
                searchQuery={searchQuery}
                onResetFilters={handleResetFilters}
              />
            </motion.div>
          )}
        </main>
      </div>

      {/* Role Details Modal */}
      <RoleDetailModal
        key={activeModalRole?.id}
        role={activeModalRole}
        onClose={() => setActiveModalRole(null)}
      />

      {/* Floating Back to Top Button */}
      <BackToTop threshold={350} />
    </section>
  );
}
