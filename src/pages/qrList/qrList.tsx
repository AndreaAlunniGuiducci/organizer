import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ObjCard from "../../components/molecules/objCard/objCard";
import styles from "./qrList.module.scss";
interface QrCodeValue extends BoxContent {
  boxName: string;
}
const QrList = () => {
  const { qrCode } = useParams();

  const [qrCodeValue, setQrCodeValue] = useState<QrCodeValue[] | undefined>(
    undefined
  );

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
    <div className={styles.qrList}>
      <h2>{qrCodeValue?.[0].boxName}</h2>
      <div className={styles.cardContainer}>
        {qrCodeValue?.map((i) => (
          <ObjCard item={i} />
        ))}
      </div>
    </div>
  );
};

export default QrList;
