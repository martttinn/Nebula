import { useEffect, useState } from "react";
import { cancelRender, continueRender, delayRender } from "remotion";

import { waitForNebulaFonts } from "./theme/fonts";

export const useNebulaVideoFonts = () => {
  const [fontHandle] = useState(() =>
    delayRender("Cargando tipografías de Remotion"),
  );

  useEffect(() => {
    let isActive = true;

    waitForNebulaFonts()
      .then(() => {
        if (!isActive) {
          return;
        }

        continueRender(fontHandle);
      })
      .catch((error) => {
        if (!isActive) {
          return;
        }

        cancelRender(error);
      });

    return () => {
      isActive = false;
    };
  }, [fontHandle]);
};
