import { useState } from 'react'
import Img from "./Img";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
// icons
import { MdOutlineCancel } from 'react-icons/md'




const ProductCard = ({ product }) => {
    const [openLogoutModal, setOpenLogoutModal] = useState(false)


    return (
        <Dialog open={openLogoutModal} onOpenChange={setOpenLogoutModal}>
            <DialogTrigger>
                <div className="flex flex-col justify-between max-w-sm
               bg-slate-600 p-4 rounded-2xl h-[500px] overflow-hidden cursor-pointer box-shadow-1">
                    <Img
                        src={product?.image}
                        alt={product?.title}
                        className="w-full h-[270px] object-cover rounded-2xl"
                    />

                    <div className="py-4 text-left text-lg flex flex-col gap-2">
                        <div className="font-semibold">
                            <span className="text-white/50 font-bold">Title: </span>
                            {product?.title}
                        </div>
                        <div className="font-semibold">
                            <span className="text-white/50 font-bold">Summary: </span>
                            {product?.summary|| "Not found"} 
                        </div>
                    </div>
                </div>
            </DialogTrigger>


            {/* Dialog Content */}
            <DialogContent className="bg-[#181920] text-white flex flex-col justify-evenly w-full h-[500px] border-none ">
                <DialogHeader className="flex gap-5">
                    <DialogTitle>{product?.title}</DialogTitle>
                    <DialogDescription className='flex gap-5'>
                        <div>
                            <Img
                                src={product?.image}
                                alt={product?.title}
                                className="w-full h-[270px] object-cover rounded-2xl"
                            />
                        </div>

                        <div className="py-4 text-left text-lg flex flex-col gap-2">
                            <div className="font-semibold">
                                <span className="text-white/50 font-bold">Title: </span>
                                {product?.title}
                            </div>
                            <div className="font-semibold">
                                <span className="text-white/50 font-bold">Summary: </span>
                                {product?.summary}
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex flex-col '>
                    <div className='flex flex-col gap-5'>
                        <div className="font-semibold ">
                            <span className="text-white/50 font-bold">Page Link: </span>
                            <a
                                href={product?.loc}
                                target="_blank"
                                className="text-blue-500 underline"
                            >
                                {product?.loc}
                            </a>
                        </div>

                        <div className="flex gap-5">
                            <button
                                onClick={() => setOpenLogoutModal(false)}
                                className="flex-center gap-3 font-semibold p-3 px-4 bg-green-950 hover:bg-green-900  rounded-md "
                            >
                                <MdOutlineCancel className="text-green-500 text-xl font-medium" />
                                <p>Close</p>
                            </button>
                        </div>
                    </div>


                </DialogFooter>
            </DialogContent>
        </Dialog>




    );
};

export default ProductCard;
