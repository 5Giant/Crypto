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
import ReduxT from "../pages/personal/ReduxT";
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
            <Route index element={<Assets />} />
            <Route path="assets" element={<Assets />} />
            <Route path="history" element={<History />} />
            <Route path="statistic" element={<Statistic />} />
            <Route path="redux" element={<ReduxT />} />
          </Route>
        </Routes>
      </Layout>
    </Layout>
  );
}
