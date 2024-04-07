import Header from "./components/Header/Header";
import List from "./components/Lists/Lists";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Header />
      <List />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
export default App;
