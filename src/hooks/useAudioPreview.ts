import { useState, useEffect, useRef, useCallback } from 'react';

export function useAudioPreview() {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTrackId(null);
    };

    const onError = () => {
      setIsPlaying(false);
      setError('Unable to load audio preview stream');
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
    };
  }, []);

  const playTrack = useCallback((trackId: string, previewUrl: string | null) => {
    if (!audioRef.current) return;
    setError(null);

    if (currentTrackId === trackId && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (!previewUrl) {
      setError('No audio preview available for this track');
      return;
    }

    audioRef.current.src = previewUrl;
    audioRef.current.load();
    audioRef.current.play()
      .then(() => {
        setCurrentTrackId(trackId);
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn('Playback error:', err);
        setError('Playback blocked or unsupported format');
        setIsPlaying(false);
      });
  }, [currentTrackId, isPlaying]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTrackId(null);
      setProgress(0);
    }
  }, []);

  return {
    currentTrackId,
    isPlaying,
    progress,
    error,
    playTrack,
    stop
  };
}
