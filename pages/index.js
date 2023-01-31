import Head from "next/head";
import { useRef, useState } from "react";

import styles from "../styles/Home.module.css";
import Loader from "../components/loader";

export default function Home() {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("ES");
  const inputEl = useRef(null);

  const searchWord = async (word, lang) => {
    setLoading(true);
    setDefinitions([]);

    await fetch(`/.netlify/functions/define?word=${word}&lang=${lang}`)
      .then((resp) => resp.json())
      .then((results) => setDefinitions(results))
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleKeyDown = async (event) => {
    if (event.keyCode === 13) {
      await searchWord(inputEl.current.value, lang);
    }
  };

  const onLangChange = (event) => {
    setLang(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Mint Dictionary</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          content="width=device-width,initial-scale=1,shrink-to-fit=no"
          name="viewport"
        ></meta>
      </Head>

      <main>
        <div onChange={onLangChange} className="lang">
          <input type="radio" value="ES" checked={lang === "ES"} /> ES
          <input type="radio" value="EN" checked={lang === "EN"} /> EN
          <input type="radio" value="FR" checked={lang === "FR"} /> FR
        </div>
        <input
          type="text"
          name="term"
          onKeyDown={handleKeyDown}
          ref={inputEl}
        />

        {loading ? <Loader /> : null}

        <div>
          <ul>
            {definitions.map((definition, index) => (
              <li key={`key_${index}`}>{definition}</li>
            ))}
          </ul>
        </div>
      </main>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .radio-control {
          font-size: 30px;
          accent-color: red;
        }

        .lang {
          font-size: 40px;
        }

        .lang input {
          width: 42px;
          height: 2em;
        }

        input[type="text"] {
          padding: 6px;
          font-size: 30px;
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
        ul {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        li {
          padding: 12px 0;
          border-bottom: 1px solid #ccc;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
