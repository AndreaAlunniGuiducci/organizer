import { useState } from "react";
import { Button, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const BoxName = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { place } = location.state as { place: string };
  const [boxName, setBoxName] = useState<string>("");

  return (
    <div>
      Dai un nome alla scatola in {place}
      <InputGroup>
        <input
          value={boxName}
          onChange={(e) => setBoxName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (boxName) {
                navigate(routes.newList, { state: { boxName, place } });
              }
            }
          }}
          type="text"
          className="form-control"
          placeholder="Nome scatola"
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
        <Button
          onClick={() => {
            if (boxName) {
              navigate(routes.newList, { state: { boxName, place } });
            }
          }}
        >
          Prosegui
        </Button>
      </InputGroup>
    </div>
  );
};
export default BoxName;
