import {useEffect, useRef} from 'react';

export const useTimer = (isRecording: boolean, onTimeUp: () => void) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(onTimeUp, 1000); // Ejecuta onTimeUp cada segundo
    }
    return () => {
      clearInterval(timerRef.current!);
    };
  }, [isRecording, onTimeUp]);
};
