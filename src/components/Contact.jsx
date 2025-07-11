import { useState, useRef } from "react"
import { motion } from "framer-motion"
import emailjs from '@emailjs/browser'

import { styles } from "../styles"
import { EarthCanvas } from "./canvas"
import { SectionWrapper } from "../hoc"
import { slideIn } from "../utils/motion"
import { SiHere } from "react-icons/si"




const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  // Here, e is the event
  const handleChange = (e) => {
    const { name, value } = e.target;

    // update the name to a newly created value
    // This allows us to enter the details in the form
    setForm({...form, [name]: value})  
  }
  
  const handleSubmit = (e) => {
    e.preventDefault(); //to prevent default values in the form
    setLoading(true);

    // EmailJS service configuration
    // service_3amxhz8  (Serveice Id)
    // template_z5jy618  (template id)
    // Qgi4WAh2Rio37LzwE  (Public key)
    // Here, we are using the emailjs service to send the email
    
    emailjs.send(
      'service_3amxhz8', 
      'template_z5jy618',
      {
        from_name: form.name,
        to_name: 'Ishant',
        from_email: form.email,
        to_email: 'ishantkundra9@gmail.com',
        message: form.message,
      },
      'Qgi4WAh2Rio37LzwE'  // Public key
    )
    .then(() => {
      setLoading(false);
      alert('Thank you! I will get back to you as soon as possible..');

      setForm({
        name: '',
        email: '',
        message: '',
      }), (error) => {
        setLoading(false)
        console.log(error);
        alert('Something went wrong.')
      }
    })
  }
  

  return (
    <div 
    // xl stands for extra large devices
      className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden"
    >
      <motion.div 
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl" 
        variants={slideIn('left', "tween", 0.2, 1)}
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Name</span>
            <input 
              type="text" 
              name="name" 
              value={form.name}
              onChange={handleChange}
              placeholder="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium"
            />
            
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border:none font-medium"
            />
            
          </label>

          <label className="flex flex-col">
            <span className="text-white font-medium mb-4"> Your Message</span>
            <textarea
              rows="7"  
              name="message" 
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border:none font-medium"
            />            
          </label>

          <button 
            type="submit" className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
          >
            {loading ? 'Sending...': 'Send'}
          </button>
          
        </form>

      </motion.div>

      {/* Canvas on which the earth will be displayed */}
      <motion.div variants={slideIn('right',"tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact"); //here contact was given as an id parameter, since we click on the contact on the navbar, it scrolls down to bottom to the contacts section. 