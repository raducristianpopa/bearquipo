import { Outlet } from "react-router-dom";

function Content() {
  return (
    <main>
      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-20">
        <Outlet />
      </div>
    </main>
  );
}

export default Content;
