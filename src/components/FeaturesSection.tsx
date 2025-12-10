'use client';

import { ArrowRight } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      id: 1,
      title: "AI powered message generation",
      description: "Let artificial intelligence craft personalized responses that sound like you",
      image: "/images/img_placeholder_image.png"
    },
    {
      id: 2,
      title: "Comment automation and engagement",
      description: "Like and reply to comments automatically when users engage with your content",
      image: "/images/img_placeholder_image.png"
    },
    {
      id: 3,
      title: "Lead capture and qualification",
      description: "Convert conversations into qualified leads without manual intervention or extra work",
      image: "/images/img_placeholder_image_white_a700.png"
    }
  ]

  return (
    <section className="w-full bg-white py-[56px] md:py-[112px]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-[39px] md:gap-[78px] justify-center items-center w-full">
          {/* Section Header */}
          <div className="flex flex-col gap-[8px] md:gap-[16px] justify-start items-center w-full max-w-[52%] px-[28px] md:px-[56px]">
            <div className="flex justify-center items-center w-auto">
              <span className="text-[16px] font-roboto font-semibold leading-[19px] text-center text-black">
                Feature
              </span>
            </div>
            <div className="flex flex-col gap-[13px] md:gap-[26px] justify-start items-center w-full px-[28px] md:px-[56px]">
              <h2 className="text-[24px] md:text-[48px] font-roboto font-bold leading-[29px] md:leading-[57px] text-center text-black">
                Keyword <br /> triggered <br /> responses
              </h2>
              <p className="text-[16px] md:text-[18px] font-roboto font-normal leading-[20px] md:leading-[22px] text-center text-black">
                Set keywords and watch Gramly <br /> respond automatically to DMs
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col md:flex-row gap-[16px] md:gap-[32px] w-full max-w-[1280px] mx-auto px-[40px] md:px-[80px]">
            {features?.map((feature) => (
              <div key={feature?.id} className="relative w-full md:w-[404px] h-[315px] md:h-[630px]">
                
                <div className="absolute bottom-0 left-0 right-0 p-[16px] md:p-[32px] bg-gradient-to-t from-black/70 to-transparent rounded-b-lg">
                  <div className="flex flex-col gap-[12px] md:gap-[24px] justify-start items-center w-full">
                    <div className="flex flex-col gap-[4px] md:gap-[8px] justify-start items-center w-full">
                      <div className="flex justify-start items-center w-full">
                        <span className="text-[16px] font-roboto font-semibold leading-[19px] text-left text-white">
                          Feature
                        </span>
                      </div>
                      <h3 className="text-[16px] md:text-[32px] font-roboto font-bold leading-[21px] md:leading-[41px] text-left text-white w-full">
                        {feature?.title}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-[16px] md:gap-[32px] justify-start items-center w-full">
                      <p className="text-[14px] md:text-[16px] font-roboto font-normal leading-[18px] md:leading-[24px] text-left text-white w-full">
                        {feature?.description}
                      </p>
                      <div className="flex justify-start items-center w-full">
                        <div className="flex justify-start items-center w-full">
                          <span className="text-[14px] md:text-[16px] font-roboto font-normal leading-[17px] md:leading-[19px] text-left text-white">
                            Explore
                          </span>
                          <img 
                            src="/images/img_arrow_right.svg" 
                            alt="Arrow right" 
                            className="w-[20px] md:w-[24px] h-[20px] md:h-[24px] ml-[4px] md:ml-[8px]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}