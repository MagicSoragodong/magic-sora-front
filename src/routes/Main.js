import Banner from "../components/banner/Banner";
import SearchForm from "../components/main/SearchForm";
import Board from "../components/main/Board";

function Main() {
  return (
    <div>
      <Banner width={270} height={"100vh"} />
      <SearchForm />
      <Board />
    </div>
  );
}

export default Main;

// rfce
