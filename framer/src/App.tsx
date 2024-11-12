import { useState } from "react";
import "./App.css";
import { AnimatePresence, motion } from "framer-motion";

// variants for DS3 block, handles both onscreen animation as well as appear animation on toggle again
const DS3 = {
  rest: {
    display: "none",
    width: 0,
    height: 0
  },
  animate: {
    display: "block",
    width: "100%",
    height: "100%",
    transition: {
      delay: 0.5
    }
  }
};

//variants for just the Data Science portion after the toggle (The top part)
const DataScience = {
  rest: {
    width: "1ch",
    overflow: "hidden"
  },
  animate: {
    width: "100%",
    transition: { duration: 0.2 }
  }
};

//variants for the bottom section
const StudentSociety = {
  rest: {
    height: 0,
    overflow: "hidden"
  },
  animate: {
    height: "100%",
    transition: {
      delay: 0.2
    }
  }
};

function App() {
  const [clicked, isClicked] = useState(false);
  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center items-center">
        {/* wrapper around the entire section, handles toggle state when clicked*/}
        <div
          className="absolute top-1/2 left-1/2 "
          onClick={() => {
            isClicked(!clicked);
          }}
        >
          {/* SwitCh to either display DS3 or Data Science Student Society */}
          {!clicked && (
            // Framer-motion component, animates through "variants" starting from initial when
            // component is first rendered in and then gets animated to the animate state (defined in the objects above)
            <motion.div
              variants={DS3}
              initial="rest"
              animate="animate"
              className="overflow-hidden"
            >
              DS3
            </motion.div>
          )}

          {/* framer-motion AnimatePresence hook to handle toggle off animation smoothly */}
          <AnimatePresence>
            {clicked && (
              <div className="grid grid-cols-[repeat(2,min-content)] grid-rows-[repeat(2,min-content)] gap-x-0.5">
                {/* Exit defines the animation on the component when it dismounts (this is what AnimatePresence is used for) */}
                <motion.div
                  className=""
                  variants={DataScience}
                  initial="rest"
                  animate="animate"
                  exit={{
                    width: "0.1px",
                    overflow: "hidden",
                    transition: { delay: 0.15 }
                  }}
                >
                  Data
                </motion.div>

                <motion.div
                  className=""
                  variants={DataScience}
                  initial="rest"
                  animate="animate"
                  transition={{ delay: 0.15 }}
                  exit="rest"
                >
                  Science
                </motion.div>

                <motion.div
                  className="col-start-2"
                  variants={StudentSociety}
                  initial="rest"
                  animate="animate"
                  key="StudentSociety"
                  exit="rest"
                >
                  Student Society
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default App;
