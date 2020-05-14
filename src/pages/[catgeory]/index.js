import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";
import Paginations from "components/Pagination/Pagination.js";
import Footer from "components/Footer/Footer.js";

const useStyles = makeStyles(styles);

const useStylesMatui = makeStyles(theme => ({
  root: {
    ...theme.typography.button,
    backgroundColor: "gainsboro",
    textAlign: "center"
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(3)
  }
}));

const catgeory = props => {
  const router = useRouter();
  const { catgeory } = router.query;
  const classes = useStyles();
  const classesMatui = useStylesMatui();

  const [data, setData] = React.useState({});
  console.log("props:", props, "router", router);

  const makeid = length => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const generateTopic = number => {
    var Topic = [];
    for (let index = 0; index < number; index++) {
      Topic.push({
        id: index,
        text: makeid(Math.floor(Math.random() * 80) + 2),
        message: generateLastedMessage(3)
      });
    }
    return Topic;
  };

  const generateLastedMessage = number => {
    var Message = [];
    for (let index = 0; index < number; index++) {
      Message.push({
        id: Math.floor(Math.random() * 800) + index,
        text: makeid(Math.floor(Math.random() * 80) + 2)
      });
    }
    return Message;
  };

  const generateData = catgeory => {
    setData({
      catgeory: catgeory,
      topic: generateTopic(10)
    });
  };

  React.useEffect(() => {
    generateData(catgeory);
  }, []);

  console.log(data);

  return (
    <div>
      <Header
        brand="ANONMAS TH"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        // {...props}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={6} m={6} />
        </div>
        <GridContainer justify="center" spacing={1}>
          <GridItem xs={11}>
            <CardHeader color="info">{catgeory}</CardHeader>
          </GridItem>
        </GridContainer>
        {data.topic?.map(datum => (
          <GridContainer
            justify="left"
            spacing={0}
            style={{
              width: "auto",
              margin: "auto",
              marginLeft: "inherit",
              marginRight: "inherit"
            }}
          >
            <GridItem xs={12} style={{ width: "fit-content" }}>
              <Card key={datum.id}>
                <CardBody>
                  <Link
                    href="/[catgeory]/[topic]"
                    as={`/${datum.text}/${datum.id}`}
                  >
                    <h4 className={classes.cardTitle}>{datum.text}</h4>
                  </Link>
                  {datum.message.map(value => (
                    <Box
                      component="span"
                      display="block"
                      p={1}
                      m={1}
                      borderBottom={1}
                      style={{ borderColor: "gainsboro" }}
                    >
                      <GridContainer>
                        <Avatar variant="square" className={classesMatui.small}>
                          {value.id}
                        </Avatar>
                        <GridItem xs={10}>{value.text}</GridItem>
                      </GridContainer>
                    </Box>
                  ))}
                </CardBody>
                <CardFooter>
                  <Muted>2 days ago</Muted>
                </CardFooter>
              </Card>
              <Box
                component="span"
                display="block"
                p={1}
                m={1}
                borderBottom={1}
                style={{ borderColor: "gainsboro" }}
              />
            </GridItem>
          </GridContainer>
        ))}
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={2} m={2} />
        </div>

        <GridContainer
          justify="center"
          style={{ width: "auto", margin: "auto" }}
        >
          <GridItem xs={12} style={{ width: "fit-content" }}>
            <Paginations
              pages={[
                { text: "PREV" },
                { active: true, text: 1 },
                { text: 2 },
                { text: 3 },
                { text: 4 },
                { text: "NEXT" }
              ]}
              color="info"
            />
          </GridItem>
        </GridContainer>
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={2} m={2} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default catgeory;
