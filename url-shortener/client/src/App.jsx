import { useEffect } from 'react'
import './App.css'
import { useState } from 'react';

function App() {

  const [links, setLinks] = useState([]);
  const [slug, setSlug] = useState("");
  const [userUrl, setUserUrl] = useState("");

  const handleSubmit = async (e, slug, longUrl) => {

    e.preventDefault();
    const response = await fetch("http://localhost:5001/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: slug || "",
        longUrl: longUrl,
      }),
    });

    if (!response.ok) {
      console.log("error posting link");
      return;
    }

    fetchLinks();
  };

  const fetchLinks = async () => {
    const response = await fetch("http://localhost:5001/api/links");
    const data = await response.json();
    setLinks(data);
    console.log(data);
  }

  const deleteLink = async (id) => {
    const response = await fetch(`http://localhost:5001/api/links/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
    console.error("Failed to delete link");
    return;
    }
    
    setLinks((links) => links.filter((link) => link._id !== id));
  }

  useEffect(() => {
    fetchLinks();
  }, []);


  return (
    <>
      <div className="title"> Url Shortener Website</div>
      <div className = "formInput">
      <form onSubmit = {(e) => handleSubmit(e,slug,userUrl)}>
          <div className="formTitle">Submit URL here to shorten it</div>
          <div className="inputDiv">
            <input onChange={(e) => setUserUrl(e.target.value)} type='text'  placeholder='paste link'></input>
            <input onChange={(e) => setSlug(e.target.value)} type='text' placeholder='slug (optional)'></input>
            <button type='submit'>Submit</button>
          </div>
      </form>
      <div>
        <div>
          This is your new shortened-link:
        </div>
        <div>
          placeholder.com
        </div>
        </div>
        </div>
      <div className='previous-links'>
        <div>Shortened Links</div>
        <table>
          <thead>
            <tr>
              <th>new link</th>
              <th>click-count</th>
              <th>remove</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => {
              return (
                <tr key={link._id}>
                  <td>
                    <a
                      href={`http://localhost:5001/${link.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {`jacob/${link.slug}`}
                    </a>
                  </td>
                  <td>
                    {link.clicks}
                  </td>
                  <td>
                    <button onClick = {() => deleteLink(link._id)}>delete link</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
