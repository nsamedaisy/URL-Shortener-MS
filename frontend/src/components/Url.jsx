import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Url() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();
  // const [shortUrl, setShortUrl] = useState("");
  

  const handleUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleShorten = async () => {
    try {
      const res = await axios.post("http://localhost:6000/url/api/shorturl/", {
        longUrl,
      });
      let initialData = null;

      console.log(res.data, "The Url responded successfully");
      initialData = res.data;
      localStorage.setItem("url-Item", JSON.stringify(initialData));
    } catch (error) {
      console.error(error, "An error occured");
      navigate("/url/api/shorturl/");
    }
  };

  return (
    <div className="App">
      <h1>URL Shortener Microservice</h1>
      <h2>Short URL Creation</h2>
      <p>Example: POST [project_url]/api/shorturl - https://www.google.com</p>
      <div>
        <p>URL Shortener</p>
        <div>
          <label>URL: </label>
          <input
            type="text"
            placeholder="Enter your long URL"
            onChange={handleUrlChange}
          />
          <button onClick={handleShorten}>Post Url</button>
        </div>
        <div>
          <h2>Example Usage:</h2>
          <p>
            <span>[this_project_url]/api/shorturl/</span>
          </p>
          <h3>Will Redirect to:</h3>
          <p>Link</p>
          {/* <br /> */}
          <p>
            By <span>rebaseAcademy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Url;
