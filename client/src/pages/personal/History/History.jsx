import { useContext, useEffect, useRef } from "react";
import { CryptoContext } from "../../../context/crypto-context";
import Exchanger from "../../../components/Exchanger";
import "./styles.css";
import HistoryList from "../../../components/historyList/HistoryList";
import SortBar1 from "../../../components/sortbar/SortBar1";

const exchangerStyle = {
  containerStyle: { width: "25%" },
  cardStyle: "#E6F0FF",
};

export default function History() {
  const { selNote, setSelNote, transHistory } = useContext(CryptoContext);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Очищаем предыдущий таймаут
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    // Если нет выделенного элемента или скролл отключен - выходим
    if (!selNote.selNote || !selNote.scroll) return;

    const delay = 1000;

    scrollTimeoutRef.current = setTimeout(() => {
      const element = document.getElementById("selected");
      if (element) {
        console.log("Scrolling to element", selNote.selNote);
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        console.log(element);
        setTimeout(() => {
          console.log(document.getElementById("selected"));
        }, 2000);
      }
    }, delay);

    // Очистка при размонтировании
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [selNote.selNote, selNote.scroll]);

  // Сбрасываем состояние при монтировании, но сохраняем если есть важные данные
  useEffect(() => {
    return () => {
      // При размонтировании можно сбросить или сохранить состояние
      // setSelNote(prev => ({ ...prev, scroll: false }));
    };
  }, [setSelNote]);

  return (
    <div className="page-container">
      <div className="history-container">
        <SortBar1 />
        <HistoryList
          data={{
            data: transHistory.assets,
            sortedBy: transHistory.options.sort,
          }}
        />
      </div>
      <Exchanger exData={exchangerStyle} />
    </div>
  );
}
