import React from "react";
import { PaginationButton } from "./PaginationButton";

export const Pagination = ({ items, page, setPage }) => {
  return (
    <>
      <PaginationButton
        pageNumber={page === 1 ? null : "start"}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page > 1 ? "prev" : null}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page > 2 ? page - 2 : null}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page > 1 ? page - 1 : null}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={items?.length !== 0 ? page : null}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page + 1 > Math.ceil(items?.length / 80) ? null : page + 1}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page + 2 > Math.ceil(items?.length / 80) ? null : page + 2}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page + 1 > Math.ceil(items?.length / 80) ? null : "next"}
        page={page}
        items={items}
        setPage={setPage}
      />
      <PaginationButton
        pageNumber={page + 1 > Math.ceil(items?.length / 80) ? null : "end"}
        page={page}
        items={items}
        setPage={setPage}
      />
    </>
  );
};
