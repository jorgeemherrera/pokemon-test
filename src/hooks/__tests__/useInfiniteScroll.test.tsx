import { renderHook, act } from "@testing-library/react";
import { useInfiniteScroll } from "../useInfiniteScroll";

describe("useInfiniteScroll hook", () => {
  let addEventListenerSpy: jest.SpyInstance;
  let removeEventListenerSpy: jest.SpyInstance;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, "addEventListener");
    removeEventListenerSpy = jest.spyOn(window, "removeEventListener");
    Object.defineProperty(window, "innerHeight", { value: 1000, writable: true });
    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    Object.defineProperty(document.documentElement, "scrollHeight", {
      value: 2000,
      writable: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register and clean up the scroll event listener", () => {
    const onLoadMore = jest.fn();

    const { unmount } = renderHook(() =>
      useInfiniteScroll({ isLoading: false, hasMore: true, onLoadMore })
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function),
      { passive: true }
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });

  it("should call onLoadMore when near bottom and not loading", () => {
    const onLoadMore = jest.fn();

    renderHook(() =>
      useInfiniteScroll({ isLoading: false, hasMore: true, onLoadMore, offset: 300 })
    );

    Object.defineProperty(window, "scrollY", { value: 1701 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });

  it("should not call onLoadMore if already loading", () => {
    const onLoadMore = jest.fn();

    renderHook(() =>
      useInfiniteScroll({ isLoading: true, hasMore: true, onLoadMore })
    );

    Object.defineProperty(window, "scrollY", { value: 1800 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("should not call onLoadMore if hasMore is false", () => {
    const onLoadMore = jest.fn();

    renderHook(() =>
      useInfiniteScroll({ isLoading: false, hasMore: false, onLoadMore })
    );

    Object.defineProperty(window, "scrollY", { value: 1800 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(onLoadMore).not.toHaveBeenCalled();
  });

  it("should reset isFetchingRef when isLoading becomes false", () => {
    const onLoadMore = jest.fn();

    const { rerender } = renderHook(
      (props) => useInfiniteScroll(props),
      {
        initialProps: { isLoading: true, hasMore: true, onLoadMore },
      }
    );

    rerender({ isLoading: false, hasMore: true, onLoadMore });

    Object.defineProperty(window, "scrollY", { value: 1801 });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
