import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Modal, Button } from "react-bootstrap";
import "./unsplash.css";

export const Unsplash = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("code");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");

  const [index_img, setIndex] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = (image, desc, key) => {
    setImage(image);
    setDesc(desc);
    setIndex(key);
    setShow(true);
  };

  const nextImage = () => {
    console.log(index_img);
    setImage(data.at(index_img + 1).urls.regular);
    setDesc(data.at(index_img + 1).description);
    setIndex(index_img + 1);
  };
  const prevImage = () => {
    console.log(index_img);
    setImage(data.at(index_img - 1).urls.regular);
    setDesc(data.at(index_img + 1).description);
    setIndex(index_img - 1);
  };
  const client_id = "4mB0CC1xdwTfTQGjF1v1uO9vS2Z8ubzBPd4X0B86IEU";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
        console.log(response.data.results);
        setData([...data, ...response.data.results]);
      })
      .catch((error) => {
        console.log(error);
      });
    setPage(page + 1);
  };

  useEffect(() => {
    fetchImages();
  }, [query]);

  return (
    <div className="App flex">
      <InfiniteScroll
        dataLength={data.length}
        next={fetchImages}
        hasMore={hasMore}
      >
        <div className="main ">
          {data.map((data, key) => (
            <span key={key} className=" img-box ">
              <img
                onClick={() =>
                  handleShow(data.urls.regular, data.description, key)
                }
                src={data.urls.small}
                className="img-fluid"
                alt={data.alt_description}
              />
            </span>
          ))}
          <Modal show={show} onHide={handleClose} className="img-modal">
            <Modal.Body className="image-body text-center">
              <img src={image} alt="" className="img img-fluid" />
              <button className="next" onClick={prevImage}>
                Previous
              </button>
              <button className="previous" onClick={nextImage}>
                Next
              </button>
            </Modal.Body>
            <Modal.Footer>
              <p className="description">{desc}</p>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </InfiniteScroll>
    </div>
  );
};
