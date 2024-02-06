import { Card, Col, Container, Row } from "react-bootstrap";
import homepic from "../../assets/homepic.jpg";

export const HomePage = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col xs={12} sm={12} md={6} lg={6}>
          <img
            src={homepic}
            width="400px"
            height="500px"
            className="rounded-circle"
          />
        </Col>

        <Col xs={12} sm={12} md={6} lg={6}>
          <p className="display-6">Full Stack Developer</p>
          <p className="text-justify text-muted normal-text">
            I am a full stack developer with over 3 years of experience in
            developing and maintaining business applications with React, Angular, TypeScript, Javascript, Java(Springboot), SQL(PostgreSQL, MySQL), NoSQL (Mongodb) .Obsessed with application performance, user experience, and maintainability
          </p>
        </Col>
      </Row>

      <Row>
        <div>
          <p
            style={{ marginTop: "20px", marginBottom: "20px" }}
            className="display-6 p-movetoright"
          >
            What I do
          </p>
        </div>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <Col xs={12} md={{ span: 3, offset: 1 }}>
          <Card
            key={"softwaredev"}
            text={"dark"}
            style={{ width: "20rem", height: 270 }}
            className="mb-2 element-shadow"
          >
            <Card.Header className="text-black text-center plain-background fs-5">
              Software Development
            </Card.Header>
            <Card.Body>
              <Card.Text className="normal-text">
                I build and maintain software for businesses with Java, Javascript, TypeScript, React, Angular and
                Springboot.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={{ span: 3, offset: 1 }}>
          <Card
            key={"devOps"}
            text={"dark"}
            style={{ width: "20rem", height: 270 }}
            className="mb-2 element-shadow"
          >
            <Card.Header className="text-black text-center plain-background fs-5">
              Devops
            </Card.Header>
            <Card.Body>
              <Card.Text className="normal-text">
                I specialize in minimizing deployment time to production by
                implementing CI/CD pipelines and optimizing cloud cost on AWS
                and AZURE.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={{ span: 3, offset: 1 }}>
          <Card
            key={"digitalTransformation"}
            text={"dark"}
            style={{ width: "20rem", height: "auto" }}
            className="mb-2 element-shadow"
          >
            <Card.Header className="text-black text-center plain-background fs-5">
              Consulting
            </Card.Header>
            <Card.Body>
              <Card.Text className="normal-text">
                Helping businesses achieve growth through digital transformation
                is something I am passionate about. I offer consulting services
                to businesses. To inquire about my services you can contact me
                <a
                  href="mailto:prmavhunga@gmail.com"
                  className="remove-decoration"
                >
                  {" "}
                  here{" "}
                </a>
                for more information.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
