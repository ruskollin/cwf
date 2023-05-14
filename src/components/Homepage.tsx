import { useState } from "react";
import Lottie from "lottie-react";
import BikeAnimation from "../lotties/bike.json";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const HomePage = () => {
  const [isAnimationStopped, setIsAnimationStopped] = useState(false);

  const stopAnimation = () => {
    setIsAnimationStopped(!isAnimationStopped);
    const animationDiv: any = document.querySelector(".moveAnimation");
    if (isAnimationStopped) {
      animationDiv.classList.remove("paused");
    } else {
      animationDiv.classList.add("paused");
    }
  };

  return (
    <Box
      sx={{ width: "100%", marginBottom: "-94px" }}
      className="moveAnimation"
    >
      <Button type="button" onClick={stopAnimation}>
        <Lottie
          animationData={BikeAnimation}
          loop={true}
          style={{ width: 200 }}
        />
      </Button>
    </Box>
  );
};
export default HomePage;
