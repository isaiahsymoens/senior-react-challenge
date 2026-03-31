export type PaginationProps = {
  page: number;
  pageCount: number;
  isLoading: boolean;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination = ({
  page,
  pageCount,
  isLoading,
  canPrev,
  canNext,
  onPrev,
  onNext,
}: PaginationProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="text-sm">
        <span>Page {page}{" "}of{" "}{pageCount}</span>
        {isLoading && <span className="text-xs text-zinc-600 ml-2">Updating...</span>}
      </div>
      <div className="flex gap-3">
        <button
          className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
          onClick={onPrev}
          disabled={!canPrev || isLoading}
        >Prev</button>
        <button
          className="border border-zinc-600 rounded-lg px-2 py-1 disabled:opacity-50"
          onClick={onNext}
          disabled={!canNext || isLoading}
        >Next</button>
      </div>
    </div>
  );
}