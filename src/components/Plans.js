
function Plans() {
  return (
    <div className="">
        <h2 className="border-b-2 border-[#282c2d] mt-5">Plans</h2>
        <h3>Renewal date: 04/04/2023</h3>
        <div className="w-full my-2">
            <div className="flex justify-between items-center lg:px-8 py-4">
                <div className="">
                    <h3 className="text-sm font-semibold">Netflix Basic</h3>
                    <h4 className="text-xs">480p</h4>
                </div>
                <button className="py-2 px-5 text-white text-sm bg-[#e50914] hover:bg-[#e3222c] font-semibold cursor-pointer">Subscribe</button>
            </div>
            <div className="flex justify-between items-center lg:px-8 py-4">
                <div className="">
                    <h3 className="text-sm font-semibold">Netflix Standard</h3>
                    <h4 className="text-xs">1080p</h4>
                </div>
                <button className="py-2 px-5 text-white text-sm bg-[#e50914] hover:bg-[#e3222c] font-semibold cursor-pointer">Subscribe</button>
            </div>
            <div className="flex justify-between items-center lg:px-8 py-4">
                <div className="">
                    <h3 className="text-sm font-semibold">Netflix Premium</h3>
                    <h4 className="text-xs">4K+HDR</h4>
                </div>
                <button className="py-2 px-5 text-white text-sm bg-[#e50914] hover:bg-[#e3222c] font-semibold cursor-pointer">Subscribe</button>
            </div>
        </div>
    </div>
  )
}

export default Plans