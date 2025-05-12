import { Outlet } from "react-router-dom";
import PersonalNavBar from "../../components/PersonalNavBar";

export default function PersonalLayout() {
  return (
    <div>
      <PersonalNavBar />
      {/* Общие элементы для всех страниц /personal */}
      {/* <nav>
        <Link to="assets">Активы</Link>
        <Link to="history">История</Link>
        <Link to="settings">Настройки</Link>
      </nav> */}

      {/* Здесь будут отображаться вложенные роуты */}
      <Outlet />
    </div>
  );
}
