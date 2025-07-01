import { BallCanvas } from "./canvas" 
import { SectionWrapper } from "../hoc"
import { technologies } from "../constants" //technologies that i have mentioned can be found here

const Tech = () => {
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {technologies.map((technology) => (     // mapping technologies from technologies in constants
        <div className="w-28 h-28 flex flex-col items-center justify-center" key={technology.name}>
          {/* Temporarily using image instead of 3D to prevent WebGL context issues */}
          <img src={technology.icon} alt={technology.name} className="w-16 h-16 object-contain" />
          <p className="text-white text-center text-sm mt-2">{technology.name}</p>
        </div>
      ))}
    </div>
  )
}

export default SectionWrapper(Tech,"");