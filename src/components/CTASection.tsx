'use client';
import {Button} from'@/components/ui/button';

export default function CTASection() {
  return (
    <section className="w-full bg-white py-[56px] md:py-[112px]">
      <div className="w-full max-w-[1440px] mx-auto px-[40px] md:px-[80px]">
        <div className="flex justify-center items-center w-full max-w-[1280px] mx-auto">
          <div 
            className="relative flex justify-center items-center w-full bg-cover bg-center bg-no-repeat rounded-lg px-[28px] md:px-[56px] py-[32px] md:py-[64px]"
            style={{ backgroundImage: "url('/images/img_.png')" }}
          >
            {/* Background overlay for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
            
            <div className="relative flex flex-col gap-[15px] md:gap-[30px] justify-start items-center w-full max-w-[66%]">
              <div className="flex flex-col gap-[13px] md:gap-[26px] justify-start items-center w-full px-[5px] md:px-[10px]">
                <h2 className="text-[24px] md:text-[48px] font-roboto font-bold leading-[29px] md:leading-[57px] text-center text-white">
                  Ready to automate your Instagram
                </h2>
                <p className="text-[16px] md:text-[18px] font-roboto font-normal leading-[20px] md:leading-[22px] text-center text-white">
                  Start free today. No credit card required. See results in minutes.
                </p>
              </div>
              
              <div className="flex flex-col md:flex-row gap-[8px] md:gap-[16px] justify-center items-center w-auto">
                <Button
                  text="Start"
                  text_color="#000000"
                  fill_background_color="#ffffff"
                  border_border="1 solid #ffffff"
                  padding="t=12px,r=24px,b=12px,l=24px"
                  className="w-full md:w-auto"
                />
                <Button
                  text="Demo"
                  text_color="#ffffff"
                  fill_background_color="transparent"
                  border_border="1 solid #ffffff"
                  padding="t=12px,r=24px,b=12px,l=24px"
                  className="w-full md:w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}