import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React from "react";
import { MdCircle } from "react-icons/md";

/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
    >
      <Bounded as="div">

      <Heading size="xl"className="mb-8" as="h2"> 
        {slice.primary.heading}
      </Heading>
      </Bounded>
      
      {/* Map over the tech list */}
      {slice.primary.tech_list?.map(({ tech_colour, tech_name }, index) => (
        <div key={index} className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700">
          {Array.from({ length: 15 }, (_, i) => (
            <><span
              key={i}
              className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
              style={{
                // Apply color only on the 7th occurrence
                color: i === 7 && tech_colour ? tech_colour : "inherit"
              }}
            >
              {tech_name}
            </span><span className="text-3xl">
                <MdCircle />
              </span></>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;



