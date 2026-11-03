function formatLabel(variant: string, count: string) {
  if (variant === 'meta') return ` · ${count} views`;
  return ` / ${count} views`;
}

async function loadCount(path: string): Promise<string | null> {
  const url = `https://heypr.goatcounter.com/counter/${encodeURIComponent(path)}.json`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = (await res.json()) as { count?: string | number };
  if (data.count === undefined || data.count === null) return null;
  return String(data.count);
}

export async function hydrateViewCounts() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-view-path]');
  await Promise.all(
    [...nodes].map(async (el) => {
      const path = el.dataset.viewPath;
      const variant = el.dataset.viewVariant || 'slash';
      if (!path) return;

      try {
        const count = await loadCount(path);
        if (count === null) return;
        el.textContent = formatLabel(variant, count);
        el.hidden = false;
      } catch {}
    }),
  );
}
