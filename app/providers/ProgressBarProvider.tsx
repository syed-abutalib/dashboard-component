"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  showSpinner: false,
  speed: 500,
  trickleSpeed: 200,
  minimum: 0.1,
});

export default function ProgressBarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    // Small delay so the bar is visible even on fast loads
    const timer = setTimeout(() => NProgress.done(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{children}</>;
}
