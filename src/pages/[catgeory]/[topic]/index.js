import { useRouter } from "next/router";
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
const useStyles = makeStyles(styles);

const Topic = props => {
  const router = useRouter();
  const classes = useStyles();
  const { catgeory, topic } = router.query;

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
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={6} m={6} />
        </div>
        <GridContainer justify="center" spacing={1}>
          <GridItem xs={11}>
            <CardHeader color="info">{`${catgeory} / ${topic}`}</CardHeader>
          </GridItem>
        </GridContainer>
        <div style={{ width: "100%" }}>
          <Box component="span" display="block" p={2} m={2} />
        </div>
      </div>
    </div>
  );
};

export default Topic;
