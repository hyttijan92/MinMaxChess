import { NavLink } from "react-router-dom";

function Header() {
    return (
        <nav className="p-4 mb-4 shadow">
            <span className="text-2xl text-gray-700 font-serif">MinMax Chess</span>
            <div className="hidden lg:flex lg:gap-x-12">
                <div className="relative">
                    <NavLink to="/">
                        <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                            Menu
                        </button>
                    </NavLink>
                </div>
                <div className="relative">
                    <NavLink to="/engines">
                        <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                            Engines
                        </button>
                    </NavLink>
                </div>
                <div className="relative">
                    <NavLink to="/about">
                        <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                            About
                        </button>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
export default Header;