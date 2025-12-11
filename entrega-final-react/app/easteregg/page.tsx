import Link from "next/link";
import "../globals.css";

export default function easterEgg() {
    return (
        <html>
            <body>
                <div className='wrapper'>
                    <h1>
                        Insira o código: <input className='inputfield' type='date'></input>
                    </h1>
                    <h2>
                        <br></br>Dica: Após o álbum 1...
                    </h2>
                </div>
            </body>
        </html>
    );
}
