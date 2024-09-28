import React from "react";
import { LightningBoltIcon } from "@radix-ui/react-icons";


function Features() {
  return (
    <>
      <h1 className=" text-center mb-32 sm:text-4xl font-extrabold text-3xl">
        Features
      </h1>
      <div className="container w-full  flex flex-wrap gap-8 justify-center">
        {/* Card 1 */}

        <div className="relative h-[280px] w-[230px] place-items-start  rounded-md flex flex-col border-2 border-gray-500 shadow-lg bg-white">
          <p className="mt-10 ml-4 font-extrabold text-4xl">⚡︎</p>
          <span className="text-base ml-4 font-bold">
            Rapid Form Generation
          </span>
          <p className="mt-2 ml-4 sm:text-sm/relaxed text-gray-400">
            {" "}
            AI can automate the design and structure of forms, reducing manual
            effort and enhancing accuracy.
          </p>
        </div>

        {/* //Card 2 */}

        <div className="relative h-[280px] w-[230px] place-items-start  rounded-md flex flex-col border-2 border-gray-500 shadow-lg bg-white">
          <p className="mt-10 ml-4  text-4xl">✎</p>
          <span className="text-base ml-4 font-bold">
            Seamless Customization
          </span>
          <p className="mt-2 ml-4 sm:text-sm/relaxed text-gray-400">
            {" "}
            Customizing forms empowers users to create unique and personalized
            experiences effortlessly.
          </p>
        </div>

        {/* //Card 3 */}

        <div className="relative h-[280px] w-[230px] place-items-start  rounded-md flex flex-col border-2 border-gray-500 shadow-lg bg-white">
          <p className="mt-10 ml-4  text-3xl">🧠</p>
          <span className="text-base ml-4 font-bold">AI Intergration</span>
          <p className="mt-2 ml-4 sm:text-sm/relaxed text-gray-400">
            {" "}
            Based on the prompt AI can automatically generate and customize
            forms to meet specific needs.
          </p>
        </div>

        {/* //Card 4 */}

        <div className="relative h-[280px] w-[230px] place-items-start  rounded-md flex flex-col border-2 border-gray-500 shadow-lg bg-white">
          <p className="mt-10 ml-4  text-3xl">🔗</p>
          <span className="text-base ml-4 font-bold">
            Share and Start accepting responses
          </span>
          <p className="mt-2 ml-4 sm:text-sm/relaxed text-gray-400">
            By utilizing integrated sharing options, you can distribute your
            form through various channels.
          </p>
        </div>
      </div>
    </>
  );
}

export default Features;
