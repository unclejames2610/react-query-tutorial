import logo from "./logo.svg";
import "./App.css";

import { useQuery } from "@tanstack/react-query";

function App() {
  const todoData = useQuery({
    queryKey: ["todo"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  });

  // console.log(data);

  if (todoData.isLoading) return <div>Loading...</div>;

  if (todoData.error) return <div>error fetching data</div>;

  return (
    <div className="App">
      {todoData.data.map((todo, index) => (
        <div key={index}>
          <h1>id: {todo?.id}</h1>
          <h1>id: {todo?.title}</h1>
        </div>
      ))}
    </div>
  );
}

export default App;
