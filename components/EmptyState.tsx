"use client";

import React from "react";
import { SearchX, RotateCcw, Briefcase } from "lucide-react";
import { Department } from "@/types/role";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  selectedDepartments: Department[];
  searchQuery: string;
  onResetFilters: () => void;
}

export function EmptyState({
  selectedDepartments,
  searchQuery,
  onResetFilters,
}: EmptyStateProps) {
  const activeDepartments = selectedDepartments.filter((d) => d !== "Semua");
  const isSearchActive = searchQuery.trim().length > 0;
  const isDeptFilterActive = activeDepartments.length > 0;
  const deptText = activeDepartments.join(", ");

  return (
    <Card className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border-dashed max-w-2xl mx-auto my-6">
      <CardHeader className="flex flex-col items-center pb-3">
        <div className="relative mb-3">
          <div className="size-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
            <SearchX className="size-8" />
          </div>
          <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-accent flex items-center justify-center text-accent-foreground border border-border">
            <Briefcase className="size-3.5" />
          </div>
        </div>

        <CardTitle className="text-xl font-bold">
          Tidak Ada Peran Ditemukan
        </CardTitle>

        <CardDescription className="max-w-md mt-1 leading-relaxed text-sm">
          {isSearchActive && isDeptFilterActive ? (
            <>
              Tidak ada lowongan di departemen{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{deptText}&rdquo;
              </span>{" "}
              yang cocok dengan kata kunci{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
              .
            </>
          ) : isSearchActive ? (
            <>
              Tidak ditemukan peran yang sesuai dengan pencarian{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{searchQuery}&rdquo;
              </span>
              . Coba gunakan kata kunci umum seperti <em>frontend</em>, <em>figma</em>, atau <em>product</em>.
            </>
          ) : isDeptFilterActive ? (
            <>
              Saat ini belum ada posisi terbuka untuk departemen{" "}
              <span className="font-semibold text-foreground">
                &ldquo;{deptText}&rdquo;
              </span>
              . Tim kami terus membuka peluang baru setiap bulannya.
            </>
          ) : (
            "Tidak ada peran yang cocok dengan kriteria filter saat ini."
          )}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-2">
        <Button
          type="button"
          onClick={onResetFilters}
          className="gap-2"
        >
          <RotateCcw className="size-4" />
          <span>Reset Semua Filter</span>
        </Button>
      </CardContent>
    </Card>
  );
}
