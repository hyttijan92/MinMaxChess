import { NavLink } from "react-router-dom";
import { selectUserUUID } from "../stores/rootStore";
import { useAppSelector } from "../stores/hooks";

function Header() {
    const user_uuid : string = useAppSelector(selectUserUUID)
    return (
        <nav className="p-4 mb-4 shadow">
            <span className="text-2xl text-gray-700 font-serif">MinMax Chess - user {user_uuid}</span>
            <div className="lg:flex lg:gap-x-12">
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
                    <NavLink to="/scores">
                        <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                            Scores
                        </button>
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}
export default Header;