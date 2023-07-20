import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { GetAllAudios } from "./AudioApi";
import { base_url } from "./baseUrl";

export const ViewPost = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllFile = async () => {
    try {
      console.log("a");
      const response = GetAllAudios();
      setData(response.data);
      setLoading(true);
    } catch (error) {
      alert(error.message());
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFile();
  }, []);

  return (
    <Container>
      <Card>
        <Row>
          {/*{loading &&*/}
          {/*  data?.map((post) => (*/}
          {/*    <Col lg={3} md={6} sm={12} xs={12} key={post.id}>*/}
          {/*      <Card className="my-3 p-3 rounded h-90">*/}
          {/*        <Card.Title>{post.title}</Card.Title>*/}
          {/*        <Card.Body>*/}
          {/*          <div>*/}
          {/*            <video controls width="250" height="200">*/}
          {/*              <source*/}
          {/*                src={base_url + `/play/` + post.id}*/}
          {/*                type="audio/mpeg"*/}
          {/*              ></source>*/}
          {/*            </video>*/}
          {/*          </div>*/}
          {/*        </Card.Body>*/}
          {/*      </Card>*/}
          {/*    </Col>*/}
          {/*  ))}*/}

          {loading && (
            <div>
              <video controls width="250" height="200">
                <source
                  src={base_url + `/playAudio/` + 1}
                  type="audio/mpeg"
                ></source>
              </video>
            </div>
          )}
        </Row>
      </Card>
    </Container>
  );
};
