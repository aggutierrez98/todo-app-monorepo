import { useInfiniteQuery, useQueryClient } from "react-query";
import { Fragment } from "react";
import { TodoCard } from "@c/TodoCard";
import { getTodos } from "@/api/todos";
import { LoadingBar } from "@c/LoadingBar";
import { ErrorBar } from "@c/ErrorBar";

const TODOS_LOAD_LIMIT = 8;

export const TodoList = () => {
  const userId = useQueryClient().getQueryData("user").uid;

  const {
    data,
    isLoading,
    error,
    isFetched,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["todos", userId],
    ({ pageParam = 1 }) => getTodos(userId, TODOS_LOAD_LIMIT, pageParam),
    {
      retry: 2,
      getNextPageParam: ({ data: lastPageData }, { length: actualPages }) => {
        const loadMore = lastPageData.length === TODOS_LOAD_LIMIT;
        return loadMore ? actualPages + 1 : false;
      },
    }
  );

  return (
    <>
      <LoadingBar isLoading={isLoading && !isFetched} />
      <ErrorBar isError={error} />
      <ul className="flex flex-col">
        {data?.pages.map((todoGroup, index) => (
          <Fragment key={index}>
            {todoGroup.data.map((todo) => (
              <TodoCard key={todo._id} info={todo} />
            ))}
          </Fragment>
        ))}
      </ul>
      <LoadingBar
        isLoading={isFetching && !isFetchingNextPage && isFetched}
      />
      {data && (
        <button
          onClick={fetchNextPage}
          disabled={!hasNextPage}
          className="mt-6 mb-6 shadow-sh w-48 h-10 text-lg sm:w-60 sm:h-12 self-center text-white bg-blue-500 rounded-md hover:bg-blue-400 
            disabled:bg-gray-400 dark:bg-blue-600 dark:hover:bg-blue-500 dark:disabled:bg-gray-500 transition-all 
            focus-visible:outline-custom-light dark:focus-visible:outline-custom-dark"
        >
          Load-More...
        </button>
      )}
    </>
  );
};
