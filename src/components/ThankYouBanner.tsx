"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ThankYouBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const flag = sessionStorage.getItem("novalearn-thankyou");
    if (flag) {
      setVisible(true);
      sessionStorage.removeItem("novalearn-thankyou");
    }
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 flex items-start justify-between gap-4">
      <div>
        <p className="font-semibold">Thank you for signing in!</p>
        <p className="text-sm text-emerald-700">
          We just emailed you a reminder—feel free to pick up your tutorials from any device.
        </p>
      </div>
      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Dismiss thank you message"
        className="text-emerald-700 hover:text-emerald-900"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}


