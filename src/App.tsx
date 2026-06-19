import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Stays from "./pages/Stays";
import Request from "./pages/Request";
import Book from "./pages/Book";
import Bag from "./pages/Bag";
import VillaDetail from "./pages/VillaDetail";
import ExperienceDetail from "./pages/ExperienceDetail";
import Experiences from "./pages/Experiences";
import Charters from "./pages/Charters";
import CharterDetail from "./pages/CharterDetail";
import Concierge from "./pages/Concierge";
import Support from "./pages/Support";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import Blog from "./pages/Blog";
import Account from "./pages/Account";
import AccountSettings from "./pages/AccountSettings";
import AccountAppointments from "./pages/AccountAppointments";
import AccountJourney from "./pages/AccountJourney";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import PaymentSuccess from "./pages/PaymentSuccess";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <CurrencyProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* v0.0.1 core routes */}
                <Route path="/" element={<Index />} />
                <Route path="/stays" element={<Stays />} />
                <Route path="/stays/:villaId" element={<VillaDetail />} />
                <Route path="/experiences" element={<Experiences />} />
                <Route path="/experiences/:experienceId" element={<ExperienceDetail />} />
                <Route path="/charters" element={<Charters />} />
                <Route path="/charters/:charterId" element={<CharterDetail />} />
                <Route path="/request" element={<Request />} />
                <Route path="/bag" element={<Bag />} />
                <Route path="/concierge" element={<Concierge />} />
                <Route path="/support" element={<Support />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/sitemap" element={<Sitemap />} />
                <Route path="/blog" element={<Blog />} />

                {/* Backward compatibility for legacy links */}
                <Route path="/book" element={<Book />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                {/* Account */}
                <Route
                  path="/account"
                  element={
                    <ProtectedRoute>
                      <Account />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account/settings"
                  element={
                    <ProtectedRoute>
                      <AccountSettings />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account/appointments"
                  element={
                    <ProtectedRoute>
                      <AccountAppointments />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/account/journey"
                  element={
                    <ProtectedRoute>
                      <AccountJourney />
                    </ProtectedRoute>
                  }
                />

                {/* Auth */}
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
