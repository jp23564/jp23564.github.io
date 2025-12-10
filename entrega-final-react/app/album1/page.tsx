"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import "../globals.css";

const tracks = [
  { title: "Wesley's Theory", src: "/audio/wesleys.mp3" },
  { title: "For Free? (Interlude)", src: "/audio/forfree.mp3" },
  { title: "King Kunta", src: "/audio/kunta.mp3" },
  { title: "Institutionalized", src: "/audio/institutionalized.mp3" },
  { title: "These Walls", src: "/audio/thesewalls.mp3" },
  { title: "u", src: "/audio/u.mp3" },
  { title: "Alright", src: "/audio/alright.mp3" },
  { title: "For Sale (Interlude)", src: "/audio/forsale.mp3" },
  { title: "Momma", src: "/audio/momma.mp3" },
  { title: "Hood Politics", src: "/audio/hoodpolitics.mp3" },
  { title: "How Much A Dollar Cost", src: "/audio/hmadc.mp3" },
  { title: "Complexion", src: "/audio/complexion.mp3" },
  { title: "The Blacker The Berry", src: "/audio/tbtb.mp3" },
  { title: "You Ain't Gotta Lie", src: "/audio/aintgottalie.mp3" },
  { title: "i", src: "/audio/i.mp3" },
  { title: "Mortal Man", src: "/audio/mortalman.mp3" },
];

export default function Album1() {
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
            href="https://open.spotify.com/album/7ycBtnsMtyVbbwTfJwRjSP"
            title="Ouvir no Spotify"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="tpab.png" className="albumcover"></img>
          </a>
          <div className="albuminfo">
            <h1>To Pimp A Butterfly</h1>
            <h3>Kendrick Lamar, 2015</h3>
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
                {/* Separador */}
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
