import { useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollProps {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  offset?: number;
}

export const useInfiniteScroll = ({
  isLoading,
  hasMore,
  onLoadMore,
  offset = 200,
}: UseInfiniteScrollProps) => {
  const isFetchingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (isFetchingRef.current || isLoading || !hasMore) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.documentElement.scrollHeight;

    if (pageHeight - scrollPosition <= offset) {
      isFetchingRef.current = true;
      onLoadMore();
    }
  }, [isLoading, hasMore, onLoadMore, offset]);

  useEffect(() => {
    if (!isLoading) {
      isFetchingRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    isFetchingRef.current = false;
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
};
