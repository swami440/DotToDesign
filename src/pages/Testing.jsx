import { motion } from 'framer-motion'
import video from '../assets/landing.mp4'

const Testing = () => {
  return (
    <div className="h-screen relative w-screen pt-10 pb-10 pr-10 pl-10 ">
        <motion.div
          initial={{ width: '50%'    , height: '50%'  }}
          animate={{ width: '100%', height: '100%' }}
          transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute w-full   h-full bg-black/50 z-10">
        </motion.div>
      <div  className="absolute w-full h-full  overflow-hidden rounded-sm">
        <video src={video} autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center scale-[1.02]" />
      </div>
    </div>
  )
}

export default Testing
