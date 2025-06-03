import { RootState } from "@/store";
import { setQuery } from "@/store/searchSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { query } = useSelector((state: RootState) => state.search);
  const dispatch = useDispatch();
  return (
    <div className="flex justify-center p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => dispatch(setQuery(e.target.value))}
        placeholder="Search posts..."
        className="w-full max-w-md px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default Header;
