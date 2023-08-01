import { useEffect, useMemo, useState } from 'react';
import QRCode, { QRCodeToDataURLOptions } from "qrcode";

var opts: QRCodeToDataURLOptions = {
  errorCorrectionLevel: 'H',
  type: 'image/jpeg',
  margin: 1,
  width: 300,
  color: {
    dark:"#FFFFFFFF",
    light:"#121212FF"
  }
}

export default function useQRCode (text: string) {
  const [src, setSrc] = useState("");

  useEffect(() => {
    if (text.length > 0) {
      QRCode.toDataURL(text, opts, function (err, url) {
        if (err) throw err
  
        setSrc(url)
      })
    }
  }, [text])

  return [src];
}