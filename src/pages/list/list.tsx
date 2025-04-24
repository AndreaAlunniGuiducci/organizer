import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const List = () => {
  const { qrCode } = useParams();

  const [qrCodeValue, setQrCodeValue] = useState<any[] | undefined>(undefined);

  useEffect(() => {
    if (qrCode) {
      const decodedData = atob(qrCode);
      const parsedData = JSON.parse(decodedData);
      setQrCodeValue(parsedData);
    } else {
      setQrCodeValue(undefined);
    }
  }, [qrCode]);

  return (
    <div>
      {qrCodeValue?.map((i) => (
        <>
          <div>{i.objectName}</div>
          <div>{i.objectType}</div>
        </>
      ))}
    </div>
  );
};

export default List;
