"use client";

import "../globals.css";
import { useState } from "react";

export default function EasterEgg() {
  const senhaCorreta = "untitledunmastered";
  const [senha, setSenha] = useState<string>("");

  const verificarSenha = () => {
    if (senha === senhaCorreta) {
      alert("Senha correta! Redirecionando... ✅");
      window.location.href = "/album3";
    } else {
      alert("Senha incorreta ❌");
    }
  };

  return (
    <html>
      <body>
        <div className="wrapper">
          <h1>
            Insira o código:{" "}
            <input
              className="inputfield"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className='downloadbutton' style={{display: "inline-block", color: "#1D438A"}} onClick={verificarSenha}>Verificar</button>
          </h1>

          <h2>
            <br />
            Dica: Após o álbum 1...
          </h2>
        </div>
      </body>
    </html>
  );
}
