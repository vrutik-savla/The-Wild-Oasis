import { useEffect, useRef } from "react";

// 369. Detecting a Click Outside the Modal
export function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          // console.log("Click Outside");
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.addEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
