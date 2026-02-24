import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  getPageRange,
} from '@/components/ui/pagination';

type Props = {
  page: number;
  totalPages: number;
  onChangePage: (page: number) => void;
};

export function PostPagination({ page, totalPages, onChangePage }: Props) {
  const pages = getPageRange(page, totalPages, 5);

  if (totalPages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < totalPages;

  const showLeftEllipsis = pages.length > 0 && pages[0] > 1;
  const showRightEllipsis =
    pages.length > 0 && pages[pages.length - 1] < totalPages;

  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={e => {
              e.preventDefault();
              if (canPrev) onChangePage(page - 1);
            }}
            className={!canPrev ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {/* 왼쪽 ... + 1 */}
        {showLeftEllipsis && (
          <>
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                onClick={e => {
                  e.preventDefault();
                  onChangePage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        {/* 가운데 5개 */}
        {pages.map(p => (
          <PaginationItem key={p}>
            <PaginationLink
              href="#"
              isActive={p === page}
              onClick={e => {
                e.preventDefault();
                onChangePage(p);
              }}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* 오른쪽 ... + last */}
        {showRightEllipsis && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                href="#"
                size="icon"
                onClick={e => {
                  e.preventDefault();
                  onChangePage(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={e => {
              e.preventDefault();
              if (canNext) onChangePage(page + 1);
            }}
            className={!canNext ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
