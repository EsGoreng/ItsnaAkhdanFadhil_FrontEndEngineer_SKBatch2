"use client";

import React, { useEffect, useState } from "react";
import { Role } from "@/types/role";
import {
  X,
  MapPin,
  CheckCircle2,
  DollarSign,
  Calendar,
  Send,
  Building,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RoleDetailModalProps {
  role: Role | null;
  onClose: () => void;
}

export function RoleDetailModal({ role, onClose }: RoleDetailModalProps) {
  const [hasApplied, setHasApplied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (role) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [role, onClose]);

  if (!role) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-role-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Surface */}
      <div className="relative w-full max-w-2xl bg-card text-card-foreground rounded-2xl shadow-2xl border border-border overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default">{role.department}</Badge>
              <Badge variant="secondary">{role.level}</Badge>
              <Badge variant="outline">{role.type}</Badge>
            </div>
            <h2
              id="modal-role-title"
              className="text-2xl font-bold tracking-tight text-foreground"
            >
              {role.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mt-1">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5" />
                {role.location}
              </span>
              {role.salaryRange && (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <DollarSign className="size-3.5" />
                  {role.salaryRange}
                </span>
              )}
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5" />
                Diposting {role.postedDate}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Tutup modal"
            className="rounded-full text-muted-foreground hover:text-foreground"
          >
            <X className="size-5" />
          </Button>
        </div>

        <Separator />

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex flex-col gap-6 text-sm">
          {/* Summary */}
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-foreground">Tentang Peran Ini</h4>
            <p className="text-muted-foreground leading-relaxed">
              {role.summary}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-foreground">
              Tanggung Jawab Utama
            </h4>
            <ul className="flex flex-col gap-2">
              {role.responsibilities.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-muted-foreground leading-relaxed"
                >
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-foreground">
              Kualifikasi & Persyaratan
            </h4>
            <ul className="flex flex-col gap-2">
              {role.requirements.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2.5 text-muted-foreground leading-relaxed"
                >
                  <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Skills Required */}
          <div className="flex flex-col gap-2.5">
            <h4 className="font-semibold text-foreground">
              Keahlian & Teknologi Kunci
            </h4>
            <div className="flex flex-wrap gap-2">
              {role.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-3 py-1 text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Separator />

        {/* Footer */}
        <div className="p-6 bg-muted/40 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs text-muted-foreground flex items-center gap-1.5">
            <Building className="size-4 text-primary" />
            <span>Sekolah Karir • Tim Pengembang & Talenta</span>
          </div>

          <div className="flex items-center gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Tutup
            </Button>

            {hasApplied ? (
              <Badge variant="default" className="h-10 px-4 gap-2 text-sm bg-emerald-600 hover:bg-emerald-600 text-white">
                <CheckCircle2 className="size-4" />
                <span>Lamaran Terkirim!</span>
              </Badge>
            ) : (
              <Button
                type="button"
                variant="default"
                onClick={() => setHasApplied(true)}
                className="gap-2"
              >
                <Send className="size-4" />
                <span>Lamar Posisi Ini</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
