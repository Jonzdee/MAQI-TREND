import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

/**
 * Journal page
 *
 * Features:
 * - Reads prevLocation from react-router location.state.data (keeps your original behavior)
 * - Loads journal entries from a mock API (replace `loadEntries` with a real API call)
 * - Client-side search, tag filtering, and pagination
 * - Loading / empty / error states
 *
 * Replace the mock fetch with your backend endpoint and adapt shape as necessary.
 */

const mockEntries = [
  {
    id: "1",
    title: "Understanding MAQI-TREND",
    body: "MAQI-TREND is an analytic approach to measuring micro-quantitative indicators of industry performance...",
    excerpt:
      "MAQI-TREND is an analytic approach to measuring micro-quantitative indicators of industry performance...",
    date: "2025-11-01T10:15:00Z",
    tags: ["MAQI", "Analytics"],
  },
  {
    id: "2",
    title: "Monthly Report — October",
    body: "October's report shows growth across three major vectors. We highlight supply chain improvements and...",
    excerpt: "October's report shows growth across three major vectors...",
    date: "2025-10-30T09:00:00Z",
    tags: ["Report", "Monthly"],
  },
  {
    id: "3",
    title: "Design Decisions for Q4",
    body: "Design choices made for Q4 prioritize resilience and observability across products...",
    excerpt: "Design choices made for Q4 prioritize resilience...",
    date: "2025-10-22T14:30:00Z",
    tags: ["Design", "Q4"],
  },
  // add more mock items as needed
];

const formatDate = (iso) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const EntryCard = ({ entry }) => (
  <article className="border rounded-md p-4 shadow-sm bg-white">
    <h3 className="text-lg font-semibold text-lightText mb-1">{entry.title}</h3>
    <p className="text-xs text-muted mb-2">{formatDate(entry.date)}</p>
    <p className="text-sm text-lightText mb-3">{entry.excerpt}</p>
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        {entry.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
          >
            {t}
          </span>
        ))}
      </div>
      <Link
        to={`/journal/${entry.id}`}
        state={{ entry }}
        className="text-primeColor text-sm font-medium hover:underline"
      >
        Read
      </Link>
    </div>
  </article>
);

const Journal = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    // handle case where location.state might be undefined
    if (location && location.state && location.state.data) {
      setPrevLocation(location.state.data);
    } else {
      setPrevLocation("");
    }
  }, [location]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    // Mock fetch function - replace with real fetch/axios call to your backend
    const loadEntries = async () => {
      try {
        // simulate network delay
        await new Promise((r) => setTimeout(r, 450));
        if (!mounted) return;
        // in real usage do:
        // const res = await fetch("/api/journals");
        // const data = await res.json();
        const data = mockEntries;
        setEntries(data);
      } catch (err) {
        if (!mounted) return;
        setError("Failed to load journal entries.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    loadEntries();

    return () => {
      mounted = false;
    };
  }, []);

  // derived lists
  const tags = useMemo(() => {
    const setT = new Set();
    entries.forEach((e) => (e.tags || []).forEach((t) => setT.add(t)));
    return Array.from(setT).sort();
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      const matchesQuery =
        q.length === 0 ||
        e.title.toLowerCase().includes(q) ||
        (e.excerpt && e.excerpt.toLowerCase().includes(q)) ||
        (e.body && e.body.toLowerCase().includes(q));
      const matchesTag = activeTag === "" || (e.tags || []).includes(activeTag);
      return matchesQuery && matchesTag;
    });
  }, [entries, query, activeTag]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  useEffect(() => {
    // if page is out of range when filters change, reset to 1
    if (page > pageCount) setPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, query, activeTag]);

  const visible = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="max-w-container mx-auto px-4">
      <Breadcrumbs title="Journals" prevLocation={prevLocation} />
      <div className="pb-6">
        <h1 className="max-w-[800px] text-base text-lightText mb-2">
          <span className="text-primeColor font-semibold text-lg">
            MAQI-TREND
          </span>{" "}
          Journal & Insights
        </h1>

        <p className="mb-4 text-sm text-muted max-w-[800px]">
          Read the latest analyses, reports, and design notes about MAQI-TREND.
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex gap-2 items-center">
            <input
              aria-label="Search journals"
              placeholder="Search journals..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none w-full md:w-72"
            />
            <button
              onClick={() => {
                setQuery("");
                setActiveTag("");
              }}
              className="px-3 py-2 bg-gray-100 rounded-md text-sm"
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/shop">
              <button className="w-44 h-10 bg-primeColor text-white hover:bg-black duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>

        {/* tags */}
        {tags.length > 0 && (
          <div className="mb-4 flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveTag("")}
              className={`px-3 py-1 rounded-full text-sm ${
                activeTag === ""
                  ? "bg-primeColor text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              All
            </button>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTag(t)}
                className={`px-3 py-1 rounded-full text-sm ${
                  activeTag === t
                    ? "bg-primeColor text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {/* content */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: perPage }).map((_, i) => (
              <div
                key={i}
                className="h-36 animate-pulse bg-gray-100 rounded-md"
                aria-hidden="true"
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 text-red-700 rounded-md">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="p-6 bg-yellow-50 text-yellow-800 rounded-md">
            No journal entries found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {visible.map((entry) => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>

            {/* pagination */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted">
                Showing {(page - 1) * perPage + 1}-
                {Math.min(page * perPage, filtered.length)} of {filtered.length}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-sm">
                  Page {page} / {pageCount}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                  disabled={page === pageCount}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Journal;
