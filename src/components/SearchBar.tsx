import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Search } from "react-bootstrap-icons";

const SearchBar = ({ onChange }: { onChange: (value: string) => void }) => {
  return (
    <InputGroup>
      <InputGroup.Text id="search" className="rounded-0">
        <Search />
      </InputGroup.Text>
      <Form.Control
        type="text"
        className="rounded-0"
        placeholder="Searched Person Name"
        onChange={(e) => onChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
