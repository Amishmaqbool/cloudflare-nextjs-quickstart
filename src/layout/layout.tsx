import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import React, { ReactNode } from "react";
import { getObject } from "@/lib/contentful";
interface LayoutProps {
  children: ReactNode;
  isSidebarVisible?: boolean;
}
interface AppLogo {
  appLogo: {
    src: string;
    alt: string;
  };
}

const Layout = async ({ children, isSidebarVisible = true }: LayoutProps) => {
  const appLogo = await getObject("appLogo");
  const isAppLogo = (logo: any): logo is AppLogo =>
    logo &&
    typeof logo.appLogo === "object" &&
    typeof logo.appLogo.src === "string" &&
    typeof logo.appLogo.alt === "string";

  const logo = isAppLogo(appLogo)
    ? {
      appLogo: {
        src: appLogo.appLogo.src,
        alt: appLogo.appLogo.alt,
      },
    }
    : {
      appLogo: {
        src: "/assets/svgs/appslogo.svg",
        alt: "Fallback Logo",
      },
    };

  return (
    <>
      <Navbar logo={logo} />
      <div
        className="max-w-screen-2xl mx-auto"
        style={{ display: "flex", flexDirection: "row" }}
      >
        {isSidebarVisible && (
          <div className="border-r max-lg:hidden w-[250px] bg-[#f7f7f7]">
            <Sidebar />
          </div>
        )}
        <main
          className="lg:w-[75%] sm:mt-4 bg-[#f8f8f8] overflow-hidden lg:ml-[20px]"
          style={{ flexGrow: 1 }}
        >
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
