import { Menu } from "lucide-react";

function Header({ openSidebar }) {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100"
          >
            <Menu size={24} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">
              PersonalOS
            </h1>

            <p className="text-slate-500 text-sm">
              {date}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;