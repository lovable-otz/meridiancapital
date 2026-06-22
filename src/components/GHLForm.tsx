import { useEffect, useRef, useState } from "react";
import { SITE_CONFIG } from "@/lib/site-config";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const EMBED_SCRIPT_SRC = SITE_CONFIG.ghl.embedScriptSrc;

function ensureEmbedScript() {
  if (typeof document === "undefined") return;
  if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
  const s = document.createElement("script");
  s.src = EMBED_SCRIPT_SRC;
  s.async = true;
  document.body.appendChild(s);
}

type GHLFormProps = Readonly<{
  formId?: string;
  formName?: string;
  height?: number;
  className?: string;
}>;

export function GHLForm({
  formId = SITE_CONFIG.ghl.formId,
  formName = SITE_CONFIG.ghl.formName,
  height = SITE_CONFIG.ghl.formHeight,
  className,
}: GHLFormProps) {
  const slotRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ensureEmbedScript();
    const slot = slotRef.current;
    if (!slot || slot.querySelector("iframe")) return;

    const iframeId = `inline-${formId}`;
    const iframe = document.createElement("iframe");
    iframe.src = `https://api.leadconnectorhq.com/widget/form/${formId}`;
    iframe.id = iframeId;
    iframe.title = formName;
    iframe.style.cssText = `width:100%;height:${height}px;border:none;border-radius:8px;display:block;opacity:0;transition:opacity 200ms ease-out`;
    iframe.setAttribute("data-layout", '{"id":"INLINE"}');
    iframe.setAttribute("data-trigger-type", "alwaysShow");
    iframe.setAttribute("data-trigger-value", "");
    iframe.setAttribute("data-activation-type", "alwaysActivated");
    iframe.setAttribute("data-activation-value", "");
    iframe.setAttribute("data-deactivation-type", "neverDeactivate");
    iframe.setAttribute("data-deactivation-value", "");
    iframe.setAttribute("data-form-name", formName);
    iframe.setAttribute("data-height", String(height));
    iframe.setAttribute("data-layout-iframe-id", iframeId);
    iframe.setAttribute("data-form-id", formId);
    iframe.addEventListener("load", () => {
      iframe.style.opacity = "1";
      setLoaded(true);
    });
    slot.appendChild(iframe);
  }, [formId, formName, height]);

  return (
    <div className={cn("relative w-full", className)} style={{ minHeight: `${height}px` }}>
      {!loaded && <FormSkeleton />}
      <div ref={slotRef} aria-busy={!loaded} />
    </div>
  );
}

function FormSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex flex-col gap-6 rounded-lg p-1"
    >
      {[1, 2].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      {[1, 2, 3].map((i) => (
        <div key={`select-${i}`} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex items-start gap-3 pt-2">
        <Skeleton className="h-5 w-5 flex-none rounded" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-11/12" />
          <Skeleton className="h-3 w-10/12" />
          <Skeleton className="h-3 w-9/12" />
        </div>
      </div>
      <Skeleton className="mt-2 h-11 w-full" />
    </div>
  );
}
