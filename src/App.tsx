import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./app/home";
import StoreProvider from "./components/StoreProvider";
import UIProvider from "./components/UIProvider";
import SignInPage from "./app/signIn";
import { Navbar } from "./components/Navbar";

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PageWrapper>
                <SignInPage />
              </PageWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <UIProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200">
        <Navbar />
        <main>{children}</main>
      </div>
    </UIProvider>
  );
};

export default App;
