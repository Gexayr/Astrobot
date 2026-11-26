// GoatCounter (https://stats.amsoft.am). Script tag is in index.html; calls are no-ops if it's blocked.
type GC = { count: (o: { path: string; title?: string; event?: boolean }) => void };

export function track(path: string, event = false): void {
  const gc = (window as unknown as { goatcounter?: GC }).goatcounter;
  if (gc && typeof gc.count === 'function') gc.count({ path, title: path, event });
}

// Clicks on any element with data-track="name" are counted as events. A delegated listener
// (instead of count.js's own data-goatcounter-click binding) survives React re-rendering the
// prerendered HTML.
export function initClickTracking(): void {
  document.addEventListener(
    'click',
    (e) => {
      const el = (e.target as Element | null)?.closest?.('[data-track]');
      const name = el?.getAttribute('data-track');
      if (name) track(name, true);
    },
    { capture: true },
  );
}
