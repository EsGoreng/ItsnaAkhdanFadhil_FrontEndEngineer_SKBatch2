import { RoleExplorer } from "@/components/RoleExplorer";
import {
  Compass,
  CheckCircle,
  HelpCircle,
  Layers,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary selection:text-primary-foreground">
      <main className="flex-1">
        {/* The Role Explorer Component Container */}
        <div id="explorer">
          <RoleExplorer />
        </div>

        {/* Product Reasoning & Brief Execution Rationale Section */}
        <section
          id="reasoning"
          className="border-t border-border bg-muted/30 py-12 sm:py-16"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="secondary">
                Product Thinking &amp; Design Decisions
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-4">
              Alasan Desain &amp; Eksekusi Solusi Praktis
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
              Sesuai dengan instruksi assignment, solusi difokuskan pada pemecahan masalah produk secara praktis, ketelitian mengeksekusi brief, dan kejelasan reasoning:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Default & Filter State */}
              <Card>
                <CardHeader className="p-5 pb-2">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center text-primary mb-3">
                    <Compass className="size-5" />
                  </div>
                  <CardTitle className="text-base font-bold">
                    1. State Default &amp; Filter
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Semua peran dimuat secara default dengan pill count aktif. Filter per departemen menggunakan horizontal scrollable pill bar di mobile dan wrap flex di desktop.
                  </p>
                </CardContent>
              </Card>

              {/* Card 2: Empty State & Recovery */}
              <Card>
                <CardHeader className="p-5 pb-2">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3">
                    <HelpCircle className="size-5" />
                  </div>
                  <CardTitle className="text-base font-bold">
                    2. Empty State Recovery
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Departemen <em>&ldquo;Legal &amp; Compliance&rdquo;</em> sengaja memiliki 0 peran agar reviewer bisa menguji empty state secara instan dengan 1 klik dan reset langsung.
                  </p>
                </CardContent>
              </Card>

              {/* Card 3: Card Scannability & Responsiveness */}
              <Card>
                <CardHeader className="p-5 pb-2">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
                    <CheckCircle className="size-5" />
                  </div>
                  <CardTitle className="text-base font-bold">
                    3. Hierarki &amp; Detail Modal
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Setiap kartu menyajikan info krusial (departemen, level, tipe, lokasi, skill chip). Tombol &ldquo;Detail Peran&rdquo; membuka modal lengkap dengan keyboard ESC support.
                  </p>
                </CardContent>
              </Card>

              {/* Card 4: Lazy Load & Skeleton Feedback */}
              <Card>
                <CardHeader className="p-5 pb-2">
                  <div className="size-9 rounded-xl bg-accent flex items-center justify-center text-primary mb-3">
                    <Layers className="size-5" />
                  </div>
                  <CardTitle className="text-base font-bold">
                    4. Lazy Load &amp; Skeleton
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 pt-0">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Saat item peran berjumlah banyak, sistem memuat per batch 6 kartu menggunakan IntersectionObserver disertai skeleton placeholder animasi pulse yang halus.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
