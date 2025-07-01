import React from 'react'
import { Typewriter } from 'react-simple-typewriter';
import {motion} from 'framer-motion';
import {styles} from '../styles';
import { ComputersCanvas } from './canvas';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      
      {/* it contains the hero text descripiton about myself */}
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5 z-10`}>
        <div className="flex flex-col justify-center items-center mt-5">
          {/* the circle to the left of Hi */}
          <div className="w-5 h-5 rounded-full bg-[#915eff]"/>
          {/* the gradient line under the circle */}
          <div className="w-1 sm:h-80 h-40 violet-gradient"/>
        </div >
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Hi, I'm <span className='text-[#915eff]'>Ishant</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}> I am a
          <span style={{ color: '#915eff' }}>
          <Typewriter className="text"
              words={[' <AI/ML Engineer/>..', ' <Full Stack Developer/>..', ' <Power BI Developer/>..', ' <Embedded Systems Engineer/>..']}
              cursorColor='#915eff'
              loop
              cursor
              cursorStyle='|'
              typeSpeed={20}
              deleteSpeed={20}
              delaySpeed={1000}
            />
            </span>
          
           <br/> Welcome to my AI & Software Engineer Portfolio.</p>
        </div>
      </div>

{/* 3d computer canvas */}
      <div className="absolute inset-0 top-0 h-full w-full z-0">
        <ComputersCanvas />
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center z-10'>
        {/* link when clicked directs you from hero to about section */}
        <a href="#about">

{/* scroll cylilnder */}
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-[#915eff]  flex justify-center items-start p-2'>

            {/* verticle moving ball inside scroll cylinder */}
            <motion.div animate={{
              y:[0,24,0]}}
              transition={{
                duration:1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
              className="w-3 h-3 rounded-full bg-violet-400 mb-1"
            />
          </div>
        </a>
      </div>
    </section>

  )
}

export default Hero