"use client";

import React, { useMemo } from "react";
import { Role } from "@/types/role";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface RoleCardProps {
  role: Role;
  onViewDetails: (role: Role) => void;
}

/**
 * Singkat format angka gaji menjadi format ringkas (misal: "Rp 15jt", "Rp 15,5jt", "Rp 10jt - 16jt")
 * untuk tampilan layar mobile yang lebih optimal dan responsif.
 */
function formatCompactSalary(salary?: string): string {
  if (!salary) return "Gaji Terbuka";

  // Tangkap setiap angka berkoma/titik ribuan (contoh: "10.000.000" atau "7.500.000")
  let compact = salary.replace(/(\d+(?:\.\d{3})+)/g, (match) => {
    const num = parseInt(match.replace(/\./g, ""), 10);
    if (isNaN(num)) return match;

    if (num >= 1_000_000_000) {
      const val = num / 1_000_000_000;
      const formatted = Number.isInteger(val)
        ? val.toString()
        : val.toFixed(1).replace(".", ",");
      return `${formatted}M`;
    }
    if (num >= 1_000_000) {
      const val = num / 1_000_000;
      const formatted = Number.isInteger(val)
        ? val.toString()
        : val.toFixed(1).replace(".", ",");
      return `${formatted}jt`;
    }
    if (num >= 1_000) {
      const val = num / 1_000;
      const formatted = Number.isInteger(val)
        ? val.toString()
        : val.toFixed(1).replace(".", ",");
      return `${formatted}rb`;
    }

    return match;
  });

  // Hapus repetisi "Rp" pada rentang gaji (misal: "Rp 10jt - Rp 16jt" -> "Rp 10jt - 16jt")
  compact = compact.replace(/Rp\s*([0-9,.]+jt|[0-9,.]+rb)\s*-\s*Rp\s*/gi, "Rp $1 - ");

  return compact;
}

export function RoleCard({ role, onViewDetails }: RoleCardProps) {
  const fullSalary = role.salaryRange || "Gaji Terbuka";
  const compactSalary = useMemo(() => formatCompactSalary(role.salaryRange), [role.salaryRange]);

  return (
    <Card className="group h-full flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-primary/40 relative overflow-hidden">
      <div>
        <CardHeader className="p-4 sm:p-5 pb-2.5 sm:pb-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Badge variant="secondary" className="font-semibold text-xs">
              {role.department}
            </Badge>
            <span className="inline-flex items-center text-xs font-medium text-muted-foreground shrink-0">
              <Clock className="size-3.5 mr-1" />
              {role.postedDate}
            </span>
          </div>

          <CardTitle
            onClick={() => onViewDetails(role)}
            className="text-base sm:text-lg font-bold group-hover:text-primary transition-colors cursor-pointer line-clamp-2 leading-snug"
          >
            {role.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-3 sm:gap-3.5">
          {/* Metadata info */}
          <div className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 shrink-0">
              <MapPin className="size-3.5" />
              <span>{role.location}</span>
            </span>
            <span className="inline-flex items-center gap-1 shrink-0">
              <Briefcase className="size-3.5" />
              <span>{role.level} • {role.type}</span>
            </span>
          </div>

          {/* Role Summary */}
          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {role.summary}
          </p>

          {/* Skills Tag List */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            {role.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="font-normal text-[11px] sm:text-xs py-0.5 px-2 bg-muted/50"
              >
                {skill}
              </Badge>
            ))}
            {role.skills.length > 4 && (
              <Badge
                variant="outline"
                className="font-normal text-[11px] sm:text-xs py-0.5 px-1.5 text-muted-foreground bg-transparent"
              >
                +{role.skills.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </div>

      <div>
        <Separator />
        <CardFooter className="p-4 sm:p-5 pt-3 sm:pt-4 flex items-center justify-between gap-2">
          <div className="min-w-0 flex-1" title={fullSalary}>
            <span className="block text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate">
              {/* Tampilan ringkas di mobile (misal: "Rp 15jt - 22jt"), format lengkap di layar sm ke atas */}
              <span className="sm:hidden">{compactSalary}</span>
              <span className="hidden sm:inline">{fullSalary}</span>
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(role)}
            className="text-primary hover:text-primary gap-1 sm:gap-1.5 group/btn shrink-0 text-xs px-2.5 sm:px-3 h-8"
          >
            <span>Detail Peran</span>
            <ArrowRight className="size-3.5 sm:size-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
