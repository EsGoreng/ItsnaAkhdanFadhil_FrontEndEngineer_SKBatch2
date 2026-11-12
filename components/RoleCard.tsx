"use client";

import React from "react";
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

export function RoleCard({ role, onViewDetails }: RoleCardProps) {
  return (
    <Card className="group h-full flex flex-col justify-between transition-all duration-200 hover:shadow-md hover:border-primary/40 relative overflow-hidden">
      <div>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <Badge variant="secondary" className="font-semibold">
              {role.department}
            </Badge>
            <span className="inline-flex items-center text-xs font-medium text-muted-foreground">
              <Clock className="size-3.5 mr-1" />
              {role.postedDate}
            </span>
          </div>

          <CardTitle
            onClick={() => onViewDetails(role)}
            className="text-lg font-bold group-hover:text-primary transition-colors cursor-pointer line-clamp-2"
          >
            {role.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-3.5">
          {/* Metadata info */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3.5" />
              {role.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Briefcase className="size-3.5" />
              {role.level} • {role.type}
            </span>
          </div>

          {/* Role Summary */}
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {role.summary}
          </p>

          {/* Skills Tag List */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {role.skills.slice(0, 4).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="font-normal text-xs bg-muted/50"
              >
                {skill}
              </Badge>
            ))}
            {role.skills.length > 4 && (
              <Badge
                variant="outline"
                className="font-normal text-xs text-muted-foreground bg-transparent"
              >
                +{role.skills.length - 4}
              </Badge>
            )}
          </div>
        </CardContent>
      </div>

      <div>
        <Separator />
        <CardFooter className="pt-4 flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {role.salaryRange ? role.salaryRange : "Gaji Terbuka"}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetails(role)}
            className="text-primary hover:text-primary gap-1.5 group/btn"
          >
            <span>Detail Peran</span>
            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
