"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import "../globals.css";

const tracks = [
  { title: "untitled 01 | 08.19.2014", src: "/audio/u01.mp3" },
  { title: "untitled 02 | 06.23.2014.", src: "/audio/u02.mp3" },
  { title: "untitled 03 | 05.28.2013.", src: "/audio/u03.mp3" },
  { title: "untitled 04 | 08.14.2014.", src: "/audio/u04.mp3" },
  { title: "untitled 05 | 09.21.2014.", src: "/audio/u05.mp3" },
  { title: "untitled 06 | 06.30.2014.", src: "/audio/u06.mp3" },
  { title: "untitled 07 | 2014-2016", src: "/audio/u07.mp3" },
  { title: "untitled 08 | 09.06.2014.", src: "/audio/u08.mp3" },
];

export default function Album3() {
  const audioRefs = useRef<HTMLAudioElement[]>([]);
  const [progress, setProgress] = useState<number[]>(
    Array(tracks.length).fill(0)
  );
  const [isPlaying, setIsPlaying] = useState<number | null>(null);

  // Atualiza a barra de progresso em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = tracks.map((_, i) => {
        const audio = audioRefs.current[i];
        if (!audio) return 0;
        return audio.currentTime / audio.duration || 0;
      });

      setProgress(updated);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const handlePlay = (index: number) => {
    const current = audioRefs.current[index];

    // Pausa todas as outras
    audioRefs.current.forEach((audio, i) => {
      if (audio && i !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Toca/pausa a atual
    if (current.paused) {
      current.play();
      setIsPlaying(index);
    } else {
      current.pause();
      setIsPlaying(null);
    }

    // Ao terminar, volta para ▶️
    current.onended = () => {
      setIsPlaying(null);
    };
  };

  const handleSeek = (index: number, value: number) => {
    const audio = audioRefs.current[index];
    if (!audio || !audio.duration) return;

    audio.currentTime = audio.duration * value;
    setProgress((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  return (
    <html>
      <body>
        <div className="backbutton">
          <Link href="./" title='Voltar'><img src='back.png' width='30px' height='30px'></img></Link>
        </div>
        <div className="wrapper">
          <a
            href="https://open.spotify.com/album/0kL3TYRsSXnu0iJvFO3rud"
            title="Ouvir no Spotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="uu.jpg" className="albumcover"></img>
          </a>
          <div className="albuminfo">
            <h1>untitled unmastered.</h1>
            <h3>Kendrick Lamar, 2016</h3>
          </div>
          <ol>
            {tracks.map((track, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {/* Play/Pause */}
                  <button onClick={() => handlePlay(index)}>
                    {isPlaying === index ? "⏸️" : "▶️"}
                  </button>

                  {/* Nome */}
                  {track.title}

                  {/* Refs de áudio */}
                  <audio
                    ref={(el) => {
                      if (el) audioRefs.current[index] = el;
                    }}
                    src={track.src}
                  />
                  {/* Baixar Músicas */}
                  <a href={track.src} title={`Baixar ${track.title}`} download><img className='downloadbutton' width='15px' height='15px' src='download.png'></img></a>
                </div>

                {/* Barra de progresso */}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={progress[index]}
                  onChange={(e) => handleSeek(index, Number(e.target.value))}
                  style={{ width: "300px" }}
                />
                {index >= 0 && index < tracks.length - 1 && (
                  <hr
                    style={{
                      width: "100%",
                      border: "0",
                      borderTop: "1px solid #444",
                      margin: "8px 0",
                    }}
                  />
                )}
              </li>
            ))}
          </ol>
        </div>
      </body>
    </html>
  );
}
