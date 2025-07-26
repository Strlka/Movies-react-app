import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

const useScrollRestoration = (ref: React.RefObject<HTMLElement>) => {

    const location = useLocation();

    // Восстановление позиции
    useEffect(() => {
      const key = "scrollPos:" + location.pathname;
      const saved = sessionStorage.getItem(key);
      if (saved && ref.current) {
        ref.current.scrollTop = Number(saved);
      }
    }, [location.pathname, ref]);
  
    // Сохранение позиции при каждом scroll
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const save = () => sessionStorage.setItem("scrollPos:" + location.pathname, String(el.scrollTop));
      el.addEventListener("scroll", save);
      return () => {
        el.removeEventListener("scroll", save);
        save(); // На всякий случай сохранить на unmount
      };
    }, [location.pathname, ref]);
}

export default useScrollRestoration



