"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const InvalidRouteRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect if invalid combination of routes
    if (
      (pathname.includes("/r/donate") && pathname.includes("/f/find-pet")) ||
      (pathname.includes("/f/find-pet") && pathname.includes("/r/donate"))
    ) {
      router.replace("/"); // Redirect to home or a valid route
    }

    // Add more invalid route checks as needed
  }, [pathname, router]);

  return null;
};

export default InvalidRouteRedirect;
