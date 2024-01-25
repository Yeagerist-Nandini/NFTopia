

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.25] justify-center items-center">
        {/* <img src={''} alt="logo" className="w-32" /> */}
      </div>

      <div className="text-[#eedaf5] flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-base text-center mx-2 cursor-pointer">
          Market
        </p>
        <p className="text-base text-center mx-2 cursor-pointer">
          Artist
        </p>
        <p className=" text-base text-center mx-2 cursor-pointer">
          Features
        </p>
        <p className="text-base text-center mx-2 cursor-pointer">
          Community
        </p>
      </div>

      <div className="flex flex-[0.25] justify-center items-center">
        <p className="text-white text-right text-xs">
          &copy;2024 All rights reserved
        </p>
      </div>
    </div>
  </div>
)

export default Footer