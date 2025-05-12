import { Layout } from "antd";
import AppHeader from "./AppHeader";
import ByeCrypto from "../pages/ByeCrypto";
import { Routes, Route } from "react-router-dom";
import PersonalLayout from "../pages/personal/PersonalLayout";
import Assets from "../pages/personal/Assets";
import History from "../pages/personal/History/History";
import AuthPage from "../pages/authentication/AuthPage";
import RegPage from "../pages/authentication/RegPage";
import Statistic from "../pages/personal/Statictic";
export default function AppLayout() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <Routes>
          <Route path="/" element={<ByeCrypto />} />
          <Route path="login" element={<AuthPage />} />
          <Route path="register" element={<RegPage />} />
          <Route path="/personal" element={<PersonalLayout />}>
            <Route index element={<Assets />} /> // /personal
            <Route path="assets" element={<Assets />} /> // /personal/assets
            <Route path="history" element={<History />} /> // /personal/history
            <Route path="statistic" element={<Statistic />} /> // /personal/1
          </Route>
        </Routes>
      </Layout>
    </Layout>
  );
}
