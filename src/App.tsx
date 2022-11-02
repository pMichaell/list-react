import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { useSearchParams } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import UsersList from "./components/UsersList";
import debounce from "./utils/debounce";

const App = () => {
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({});
  }, []);

  const onSearchBarChange = (value: string) => {
    if (value) {
      setSearchParams({ user: value });
      return;
    }

    setSearchParams({});
  };

  const debOnSearchBarChange = debounce(onSearchBarChange, 100);

  return (
    <>
      <Container fluid as="header" className="text-center p-1">
        <h1>TeaCode Task</h1>
      </Container>
      <main className="d-flex justify-content-center align-items-center">
        <Stack
          direction="vertical"
          className="align-items-center"
          gap={1}
          style={{ maxWidth: "800px" }}
        >
          <SearchBar onChange={debOnSearchBarChange} />
          <UsersList />
        </Stack>
      </main>
    </>
  );
};

export default App;
