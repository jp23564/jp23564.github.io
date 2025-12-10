import Link from "next/link";
import "./globals.css";

export default function HomePage() {
  return (
    <html>
      <body>
        <div className="wrapper">
          <Link href="/album1" title="To Pimp A Butterfly">
            <img src="/tpab.png" className="albumcover"></img>
          </Link>
        </div>
        <div className="wrapper">
          <Link href="/album2" title="CALL ME IF YOU GET LOST">
            <img src="/cmiygl.jpg" className="albumcover"></img>
          </Link>
        </div>
      </body>
    </html>
  );
}
