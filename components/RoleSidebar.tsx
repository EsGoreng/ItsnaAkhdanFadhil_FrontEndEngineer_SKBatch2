"use client";

import React from "react";
import { Department } from "@/types/role";
import { DEPARTMENTS } from "@/data/roles";
import { Search, X, Filter, SlidersHorizontal, RotateCcw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence, MotionConfig } from "motion/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleSidebarProps {
  selectedDepartments: Department[];
  onToggleDepartment: (dept: Department) => void;
  onClearDepartments: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
  departmentCounts: Record<Department, number>;
  totalRolesCount: number;
  filteredRolesCount: number;
  isFilteringActive: boolean;
  onResetFilters: () => void;
}

export function RoleSidebar({
  selectedDepartments,
  onToggleDepartment,
  onClearDepartments,
  searchQuery,
  setSearchQuery,
  selectedLevel,
  setSelectedLevel,
  departmentCounts,
  filteredRolesCount,
  isFilteringActive,
  onResetFilters,
}: RoleSidebarProps) {
  const activeDepartments = selectedDepartments.filter((d) => d !== "Semua");
  const isAllSelected = activeDepartments.length === 0;
  return (
    <MotionConfig reducedMotion="user">
      <motion.aside
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="w-full lg:w-80 lg:shrink-0 lg:sticky lg:top-6 self-start flex flex-col gap-5"
      >
        <Card className="shadow-sm">
          <CardHeader className="p-5 pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="size-4 text-primary" />
                <CardTitle className="text-base font-bold">
                  Filter
                </CardTitle>
              </div>

              {/* Animated Reset Button */}
              <AnimatePresence>
                {isFilteringActive && (
                  <motion.div
                    key="sidebar-reset-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={onResetFilters}
                      className="h-7 px-2 text-xs text-destructive hover:text-destructive gap-1"
                    >
                      <RotateCcw className="size-3" />
                      <span>Reset</span>
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </CardHeader>



          <CardContent className="p-5 pt-0 flex flex-col gap-2">
            {/* 1. Search Bar */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="sidebar-search"
                className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5"
              >
              </label>
              <div className="relative">
                <Input
                  id="sidebar-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Posisi, skill, lokasi..."
                  className="pr-9 h-10 text-xs rounded-xl bg-muted/30"
                />
                <AnimatePresence>
                  {searchQuery && (
                    <motion.div
                      key="sidebar-clear-search-btn"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setSearchQuery("")}
                        aria-label="Hapus pencarian"
                        className="size-7 text-muted-foreground hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 2. Quick Level Filter Dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
              </label>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full h-10 text-xs bg-muted/30">
                  <SelectValue placeholder="Semua Jenjang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Pilih Jenjang</SelectLabel>
                    <SelectItem value="Semua">Semua Jenjang</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid-Level">Mid-Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Lead</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            {/* 3. Department Filter List with Micro-interactions */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Departemen {activeDepartments.length > 0 && `(${activeDepartments.length})`}
                </span>
                {!isAllSelected && (
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={onClearDepartments}
                    className="text-xs h-auto p-0 text-muted-foreground hover:text-foreground"
                  >
                    Reset
                  </Button>
                )}
              </div>

              <nav aria-label="Filter Departemen Sidebar" className="flex flex-col gap-1">
                {DEPARTMENTS.map((dept) => {
                  const isSemua = dept.id === "Semua";
                  const isSelected = isSemua ? isAllSelected : selectedDepartments.includes(dept.id);
                  const count = departmentCounts[dept.id] ?? 0;

                  return (
                    <motion.div
                      key={dept.id}
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Button
                        type="button"
                        variant={isSelected ? "default" : "ghost"}
                        size="sm"
                        onClick={() => {
                          if (isSemua) {
                            onClearDepartments();
                          } else {
                            onToggleDepartment(dept.id);
                          }
                        }}
                        className="w-full justify-between h-9 px-3 text-xs font-medium rounded-lg"
                      >
                        <span className="truncate">{dept.label}</span>
                        <Badge
                          variant={isSelected ? "secondary" : "outline"}
                          className={`ml-2 px-1.5 py-0 text-[11px] leading-tight font-normal transition-colors ${isSelected
                            ? "bg-primary-foreground/20 text-primary-foreground border-transparent"
                            : count === 0
                              ? "opacity-50"
                              : "text-muted-foreground bg-muted/40"
                            }`}
                        >
                          {count}
                        </Badge>
                      </Button>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* 4. Animated Active Filter Tags */}
            <AnimatePresence>
              {isFilteringActive && (
                <motion.div
                  key="sidebar-active-filters-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  style={{ overflow: "hidden" }}
                  className="flex flex-col gap-3 pt-1"
                >
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Filter Aktif
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      <AnimatePresence mode="popLayout">
                        {activeDepartments.map((dept) => (
                          <motion.div
                            key={`active-tag-dept-${dept}`}
                            layout
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Badge variant="secondary" className="gap-1 font-medium text-[11px] py-1">
                              <span>{dept}</span>
                              <button
                                type="button"
                                onClick={() => onToggleDepartment(dept)}
                                aria-label={`Hapus filter ${dept}`}
                                className="hover:opacity-75 cursor-pointer"
                              >
                                <X className="size-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        ))}
                        {selectedLevel !== "Semua" && (
                          <motion.div
                            key="active-tag-level"
                            layout
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Badge variant="outline" className="gap-1 font-medium text-[11px] py-1">
                              <span>Level: {selectedLevel}</span>
                              <button
                                type="button"
                                onClick={() => setSelectedLevel("Semua")}
                                aria-label={`Hapus filter level ${selectedLevel}`}
                                className="hover:opacity-75 cursor-pointer"
                              >
                                <X className="size-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        )}
                        {searchQuery && (
                          <motion.div
                            key="active-tag-search"
                            layout
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.18 }}
                          >
                            <Badge variant="outline" className="gap-1 font-medium text-[11px] py-1">
                              <span className="truncate max-w-[120px]">&ldquo;{searchQuery}&rdquo;</span>
                              <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label="Hapus kata kunci pencarian"
                                className="hover:opacity-75 cursor-pointer"
                              >
                                <X className="size-3" />
                              </button>
                            </Badge>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.aside>
    </MotionConfig>
  );
}
