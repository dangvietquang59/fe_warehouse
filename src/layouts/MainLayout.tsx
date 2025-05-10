import LanguageSwitcher from "@/components/common/SwitchLanguage";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 bg-blue-600 text-white flex justify-end">
        <LanguageSwitcher />
      </header>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <footer className="p-4 bg-gray-100 text-center">Footer</footer>
    </div>
  );
};

export default MainLayout;
