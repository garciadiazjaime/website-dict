import Head from "next/head";
import { useRef, useState } from "react";

import styles from "../styles/Home.module.css";
import Loader from "../components/loader";

export default function Home() {
  const [definitions, setDefinitions] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputEl = useRef(null);

  const searchWord = async (word) => {
    setLoading(true);
    setDefinitions([])

    await fetch(`/.netlify/functions/define?word=${word}`)
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
      await searchWord(inputEl.current.value);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div>
          <input type="radio" value="ES" checked/>
          ES

          <input type="radio" value="EN"/>
          EN

          <input type="radio" value="FR"/>
          FR
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
