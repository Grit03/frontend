import { useEffect, useState } from "react";

export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // 브라우저에서만 실행되도록 체크
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // 초기 크기 설정
      handleResize();

      // 리사이즈 이벤트 리스너 추가
      window.addEventListener("resize", handleResize);

      // 컴포넌트가 언마운트될 때 리스너 제거
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
}
