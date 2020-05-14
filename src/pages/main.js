import React from "react";
import classNames from "classnames";
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import InputAdornment from "@material-ui/core/InputAdornment";
import Box from "@material-ui/core/Box";
// @material-ui/icons
import Search from "@material-ui/icons/Search";
// assets components
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Footer from "components/Footer/Footer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Muted from "components/Typography/Muted.js";

const useStyles = makeStyles(styles);
// #7b7afa,#815ee5,#7057c0,#6350a6,#594991
var mockChipdata = [];
var mockHotTopicdata = [];

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

const generateData = number => {
  for (let index = 0; index < number; index++) {
    mockChipdata.push({
      id: index,
      topic: makeid(Math.floor(Math.random() * 12) + 2)
    });
  }
};

const generateComment = number => {
  var Comment = [];
  for (let index = 0; index < number; index++) {
    Comment.push({
      id: index,
      text: makeid(Math.floor(Math.random() * 80) + 2)
    });
  }
  return Comment;
};

generateData(100);

const generateDataHotTopic = (mockChipdata, number) => {
  for (let index = 0; index < number; index++) {
    let rng =
      mockChipdata[Math.floor(Math.random() * (mockChipdata.length - 1))];
    mockHotTopicdata.push({
      id: rng.id,
      topic: rng.topic,
      Comment: generateComment(3)
    });
  }
};

generateDataHotTopic(mockChipdata, 6);

const Components = props => {
  const [topic, setTopic] = React.useState("");
  const classes = useStyles();
  // const { ...rest } = props;

  const filterItems = (arr, query) => {
    return arr.filter(
      el => el.topic.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  };

  // console.log(topic);

  return (
    <div>
      <Header
        brand="ANONMAS TH"
        rightLinks={<HeaderLinks />}
        fixed
        color="dark"
        {...props}
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <GridContainer justify="center" spacing={2}>
          <GridItem
            xs={10}
            direction="row"
            alignItems="center"
            className={classes.textCenter}
            style={{ paddingTop: "20vh" }}
          >
            <CustomInput
              inputRootCustomClasses={classes.inputRootCustomClasses}
              formControlProps={{
                className: classes.formControl,
                fullWidth: true
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search",
                  className: classes.searchInput
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <Search className={classes.Search} />
                  </InputAdornment>
                ),
                onChange: event => {
                  setTopic(event.target.value);
                }
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer
          justify="center"
          style={{
            margin: "auto"
          }}
        >
          {filterItems(mockChipdata, topic).map(value => (
            <Link href="/[catgeory]" as={`/${value.topic}`}>
              <Chip
                id={value.id}
                label={value.topic}
                clickable
                color="primary"
                style={{ margin: 5, fontSize: "15px" }}
              />
            </Link>
          ))}
        </GridContainer>
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={2} m={2} />
        </div>
        <GridContainer
          spacing={3}
          justify="center"
          style={{ width: "auto", margin: "auto" }}
        >
          {mockHotTopicdata.map(value => (
            <GridItem xs={12} sm={6} md={6}>
              <Card className={classes.textCenter}>
                <CardHeader color="danger">{value.topic}</CardHeader>
                <CardBody>
                  <div style={{ width: "100%" }}>
                    {value.Comment.map(value => (
                      <Box
                        component="span"
                        display="block"
                        p={1}
                        m={1}
                        borderBottom={1}
                        style={{ borderColor: "gainsboro" }}
                      >
                        {value.text}
                      </Box>
                    ))}
                  </div>
                </CardBody>
                <CardFooter>
                  <Muted>2 days ago</Muted>
                </CardFooter>
              </Card>
            </GridItem>
          ))}
        </GridContainer>
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={2} m={2} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Components;
