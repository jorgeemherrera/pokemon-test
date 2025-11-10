import type { AboutProps } from "interfaces";
import weightIcon from "@assets/weight.svg";
import heightIcon from "@assets/height.svg";
import MeasureItem from "./MeasureItem";

const About = ({ weight, height, abilities, description }: AboutProps) => {
  return (
    <div className="pokemon-summary__about">
      <div className="pokemon-summary__measures">
        <MeasureItem
          value={weight || "Value"}
          unit="Weight"
          icon={weightIcon}
        />
        <div className="pokemon-summary__divider" />
        <MeasureItem
          value={height || "Value"}
          unit="Height"
          icon={heightIcon}
        />
        <div className="pokemon-summary__divider" />
        <MeasureItem
          value={abilities || ["ability1", "ability 2"]}
          unit="Moves"
        />
      </div>

      <p className="pokemon-summary__description body-3">
        {description ? description : "Pokemon Description"}
      </p>
    </div>
  )
}
export default About; 