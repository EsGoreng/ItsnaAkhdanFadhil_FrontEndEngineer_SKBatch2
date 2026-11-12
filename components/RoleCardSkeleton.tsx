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
    <Card aria-hidden="true" className="flex flex-col justify-between min-h-[340px]">
      <div>
        <CardHeader className="pb-3 flex flex-col gap-2">
          {/* Top Header Row (Department Badge & Date) */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-3.5 w-16" />
          </div>

          {/* Title Lines */}
          <div className="flex flex-col gap-2 pt-1">
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-5 w-3/5" />
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {/* Metadata info (Location & Level) */}
          <div className="flex items-center gap-3">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3.5 w-28" />
          </div>

          {/* Role Summary Lines */}
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-3/4" />
          </div>

          {/* Skills Tag List */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>
        </CardContent>
      </div>

      <div>
        <Separator />
        <CardFooter className="pt-4 flex items-center justify-between">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </CardFooter>
      </div>
    </Card>
  );
}
