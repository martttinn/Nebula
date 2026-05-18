import { Composition } from "remotion";

import { NebulaEditorialIntro } from "./compositions/NebulaEditorialIntro";
import { NebulaShowcase } from "./compositions/NebulaShowcase";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="NebulaShowcase"
        component={NebulaShowcase}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={240}
      />
      <Composition
        id="NebulaEditorialIntro"
        component={NebulaEditorialIntro}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={360}
      />
    </>
  );
};
