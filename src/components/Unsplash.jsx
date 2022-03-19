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
  const handleClose = () => setShow(false);
  const handleShow = (image) => {
    setImage(image);
    setShow(true);
  };

  const client_id = "4mB0CC1xdwTfTQGjF1v1uO9vS2Z8ubzBPd4X0B86IEU";
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}`;

  const fetchImages = () => {
    axios
      .get(fetchUrl, {
        headers: {},
      })
      .then((response) => {
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
                onClick={() => handleShow(data.urls.small)}
                src={data.urls.small}
                className="img-fluid"
                alt={data.alt_description}
              />
            </span>
          ))}
          <Modal show={show} onHide={handleClose} className="img-modal">
            <Modal.Body className="image-body text-center">
              <img src={image} alt="" />
            </Modal.Body>
            <Modal.Footer>
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
