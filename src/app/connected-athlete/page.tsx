"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Globe, Shield, Users, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

export default function RivalisPortal() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  // Auto-redirect based on user's role
  useEffect(() => {
    if (user) {
      if (user.user_type === 1 || user.role === "admin") {
        router.replace("/connected-athlete/admin");
      } else {
        router.replace("/connected-athlete/organizer");
      }
    }
  }, [user, router]);

  // Show loading while redirecting
  if (user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-pink-500 animate-spin" />
          <p className="text-muted-foreground">Redirecting...</p>
        </div>
      </div>
    );
  }

  // Fallback: show portal selection if role is not set
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

      <div className="relative z-10 flex flex-col items-center gap-8 p-8 max-w-md w-full">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-4 bg-pink-500/10 rounded-2xl mb-4">
            <Globe className="w-12 h-12 text-pink-500" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Rivalis</h1>
          <p className="text-muted-foreground">
            Select your portal to continue
          </p>
        </div>

        <div className="grid gap-4 w-full">
          <Link href="/connected-athlete/admin" className="w-full">
            <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="p-3 rounded-lg bg-red-500/10 group-hover:bg-red-500/20 transition-colors">
                <Shield className="w-6 h-6 text-red-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Admin Portal</span>
                <span className="text-xs text-muted-foreground">
                  Platform overview & analytics
                </span>
              </div>
            </div>
          </Link>

          <Link href="/connected-athlete/organizer" className="w-full">
            <div className="group relative flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:scale-[1.02] cursor-pointer">
              <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">Organizer Portal</span>
                <span className="text-xs text-muted-foreground">
                  Track your companies & rivals
                </span>
              </div>
            </div>
          </Link>
        </div>

        <p className="text-xs text-muted-foreground/50">
          Powered by Oneplace Dashboard
        </p>
      </div>
    </div>
  );
}
