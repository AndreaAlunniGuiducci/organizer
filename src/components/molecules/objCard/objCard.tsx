import { Button, Card } from "react-bootstrap";

interface ObjCardProps {
  item: BoxContent;
  deleteObject?: (id: number) => void;
}

const ObjCard = ({ item, deleteObject }: ObjCardProps) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={item.objectImageUrl} alt={item.objectName} />
      <Card.Body className="cardText">
        {deleteObject && (
          <Button
            variant="danger"
            className="cardButton"
            onClick={() => deleteObject(item.id)}
          >
            X
          </Button>
        )}
        <Card.Title>{item.objectName}</Card.Title>
        <Card.Text>
          {item.objectType === "other"
            ? item.objectCustomType
            : item.objectType}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default ObjCard;
