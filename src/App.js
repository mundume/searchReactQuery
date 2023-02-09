import "./styles.css";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function App() {
  const [search, setSearch] = useState("");

  const useSearch = useQuery(
    ["issues", "search", search],
    () =>
      fetch(
        `https://ui.dev/api/courses/react-query/search/issues?q=${search}`
      ).then((res) => res.json()),
    { enabled: !!search }
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(e.target.search.value);
        }}
      >
        <label>Search</label>
        <input placeholder="search" type="text" name="search" />
      </form>

      <div>{useSearch.data?.count}</div>
      {useSearch.fetchStatus === "idle" &&
      useSearch.isLoading ? null : useSearch.isLoading ? (
        <p>loading...</p>
      ) : (
        <ul>
          {useSearch.data.items?.map((item) => (
            <li key={item.id}> {item.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
