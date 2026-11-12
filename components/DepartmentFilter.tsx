"use client";

import React from "react";
import { Department } from "@/types/role";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DepartmentFilterProps {
  departments: { id: Department; label: string }[];
  selectedDepartment: Department;
  onSelectDepartment: (dept: Department) => void;
  counts: Record<Department, number>;
}

export function DepartmentFilter({
  departments,
  selectedDepartment,
  onSelectDepartment,
  counts,
}: DepartmentFilterProps) {
  return (
    <nav aria-label="Filter Departemen" className="w-full relative">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none snap-x">
        {departments.map((dept) => {
          const isSelected = selectedDepartment === dept.id;
          const count = counts[dept.id] ?? 0;

          return (
            <Button
              key={dept.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelectDepartment(dept.id)}
              className="shrink-0 rounded-full h-9 px-4 gap-2 font-medium"
            >
              <span>{dept.label}</span>
              <Badge
                variant={isSelected ? "secondary" : "outline"}
                className={`px-1.5 py-0 text-[11px] leading-tight ${
                  isSelected
                    ? "bg-primary-foreground/20 text-primary-foreground border-transparent"
                    : count === 0
                    ? "opacity-50"
                    : ""
                }`}
              >
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
