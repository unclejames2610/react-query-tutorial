import logo from "./logo.svg";
import "./App.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function App() {
  const queryClient = useQueryClient();
  const todoData = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
        res.json()
      ),
    // staleTime: 4000,

    // every 4 secs, it refreshes the data
    refetchInterval: 4000,
  });

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      }).then((res) => res.json()),
    onSuccess: (newPost) => {
      // updating the data
      // queryClient.invalidateQueries({ queryKey: ["posts"] });

      // editing the cache
      queryClient.setQueryData(["posts"], (oldPosts) => [...oldPosts, newPost]);
    },
  });

  // console.log(data);

  if (todoData.isLoading) return <div>Loading...</div>;

  if (todoData.error || isError) return <div>an error occurred</div>;

  return (
    <div className="App">
      {isPending && <p>Data is being added...</p>}
      <button
        onClick={() =>
          mutate({
            userId: 14,
            id: 800,
            title: "Edit",
            body: "new stuff for body",
          })
        }
      >
        Add Post
      </button>
      {todoData.data.map((todo, index) => (
        <div key={index}>
          <h4>id: {todo?.id}</h4>
          <h1>id: {todo?.title}</h1>
          <p> {todo.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
