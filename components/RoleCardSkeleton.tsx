import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export function RoleCardSkeleton() {
  return (
    <Card aria-hidden="true" className="h-full flex flex-col justify-between relative overflow-hidden">
      <div>
        <CardHeader className="p-4 sm:p-5 pb-2.5 sm:pb-3">
          {/* Top Header Row (Department Badge & Date) */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>

          {/* Title Lines */}
          <div className="flex flex-col gap-1.5 pt-1">
            <Skeleton className="h-5 w-4/5 rounded-md" />
            <Skeleton className="h-5 w-3/5 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 pt-0 sm:pt-0 flex flex-col gap-3 sm:gap-3.5">
          {/* Metadata info (Location & Level) */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
          </div>

          {/* Role Summary Lines */}
          <div className="flex flex-col gap-2 pt-0.5">
            <Skeleton className="h-3.5 w-full rounded" />
            <Skeleton className="h-3.5 w-11/12 rounded" />
            <Skeleton className="h-3.5 w-3/4 rounded" />
          </div>

          {/* Skills Tag List */}
          <div className="flex flex-wrap gap-1.5 pt-0.5">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </CardContent>
      </div>

      <div>
        <Separator />
        <CardFooter className="p-4 sm:p-5 pt-3 sm:pt-4 flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-24 sm:w-28 rounded" />
          <Skeleton className="h-8 w-20 sm:w-24 rounded-lg" />
        </CardFooter>
      </div>
    </Card>
  );
}
