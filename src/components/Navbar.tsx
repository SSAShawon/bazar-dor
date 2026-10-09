import Image from "next/image";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50  bg-white">
      <div className="mx-auto max-w-7xl px-7 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-600 p-2">
              <Image
                src="/image/logo-icon.png"
                alt="বাজার দর"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold leading-tight text-black">
                বাজার দর
              </h1>
              <p className="text-sm text-black">৮ অক্টোবর, ২০২৬</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="btn btn-outline border-black text-black hover:border-green-600 hover:bg-green-600 hover:text-white">
              সাইন ইন
            </button>

            <button className="btn border-green-600 bg-green-600 text-white hover:border-green-600 hover:bg-white hover:text-green-600">
              সাইন আপ
            </button>
          </div>
        </div>
      </div>

      <NavItem />
    </nav>
  );
};

export default Navbar;