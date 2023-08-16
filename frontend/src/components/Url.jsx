import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Url.css";

function Url() {
  const [longUrl, setLongUrl] = useState("");
  const navigate = useNavigate();
  // const [shortUrl, setShortUrl] = useState("");

  const handleUrlChange = (event) => {
    setLongUrl(event.target.value);
  };

  const handleShorten = async () => {
    let initialData = null;

    try {
      const res = await axios.post("http://localhost:8080/url/api/shorturl", {
        longUrl,
      });

      console.log(res.data, "The Url responded successfully");
      initialData = res.data;
      console.log("this is initialval", initialData);
      localStorage.setItem("url-Item", JSON.stringify(initialData));
    } catch (error) {
      console.error(error, "An error occured");
      navigate("/url/api/shorturl/");
    }

    // axios
    //   .post("http://localhost:6000/url/api/shorturl", { longUrl })
    //   .then((res) => {
    //     console.log("here is the response", res);
    //   })
    //   .catch((error) => console.log("An error occured", error));
    // navigate("/url/api/shorturl/");
  };

  return (
    <div className="App">
      <h1>URL Shortener Microservice</h1>
      <h2>Short URL Creation</h2>
      <p>Example: POST [project_url]/api/shorturl - https://www.google.com</p>
      <div>
        <div className="border">
        <fieldset>
          <legend>URL Shortener</legend>
          <label>URL: </label>
          <input
            type="text"
            placeholder="Enter your long URL"
            onChange={handleUrlChange}
          />
          <button onClick={handleShorten}>POST URL</button>
        </fieldset>
        </div>
        <div>
          <h2>Example Usage:</h2>
          <a href="https://portal.rebaseacademy.com/dashboard/projects/pHzC8pWKqNRvvw1dMGmP">
            <span>[this_project_url]/api/shorturl/903</span>
          </a>
          <h3>Will Redirect to:</h3>
          <p className="link">https://portal.rebaseacademy.com/</p>
          <p>
            By <span>RebaseAcademy</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Url;
