const Navbar = () => {
  return (
    <div className="flex justify-between bg-violet-600 text-white items-center py-2">
      <div className="logo">
        <span className="font-bold text-4xl mx-9">I Task</span>
      </div>

      <ul className="flex gap-10 mx-9 font-semibold ">
        <li className="cursor-pointer hover:font-extrabold transition-all duration-100 ">
          Home
        </li>
        <li className="cursor-pointer hover:font-extrabold transition-all  duration-100 ">
          Your Task
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
