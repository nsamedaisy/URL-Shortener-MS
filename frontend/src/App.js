import { React, useState } from "react";
import axios from "axios";

function App() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleShorten = async () => {
    try {
      const res = await axios.post(
        "http://localhost:6000/url/api/shorturl/new/",
        { url: longUrl }
      );
      setShortUrl(res.data.shortUrl);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>URL SHRINKER MICROSERVICE</h1>
      <h3>
        Generate a short url and redirect it to a long url when a user click the
        short url
      </h3>
      <div>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={longUrl}
          onChange={handleUrlChange}
        />
        <button onClick={handleShorten}>Shorten</button>
      </div>
      <div>
        {shortUrl && (
          <p>
            ShortUrl: {" "}
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;