import React, { useEffect } from "react";
//import CollectionOverview from "../../Components/CollectionOverview/CollectionOverview";
//import CollectionPage from "../Collection/Collection";
import { Route } from "react-router-dom";

import { connect } from "react-redux";

//!NOW
import { fetchCollectionsStart } from "../../Redux/Shop/shopActions";
//import { createStructuredSelector } from "reselect";

//import WithSpinner from "../../Components/WithSpinner/WithSpinner";
import CollectionOverviewContainer from "../../Components/CollectionOverview/collectionOverviewContainer";
import CollectionPageContainer from "../Collection/collectionPageContainer";

//see backup
//!const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
//!const CollectionPageWithSpinner = WithSpinner(CollectionPage);

//because in the app.js  the ShopPage component is nested in a route,
//it automatically has access to the 3 objects
const ShopPage = ({ fetchCollectionsStart, match }) => {
  /*componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }*/

  //app.js checkSession cause component to rerender, firing fetchCollection() twice
  useEffect(() => {
    fetchCollectionsStart();
  }, [fetchCollectionsStart]);
  //only rerender if fetchCollectionsStart changes
  //we know fetchCollectionsStart is not going to rerender as it is dispatched as a prop
  //we only put it to avoid the warning message, [] should work
  //warning comes because useEffect takes fetchCollectionsStart as a prop, therefore if it changes from the
  //parent (inexistent in this case), it should rerender

  //!const { isCollectionLoaded } = this.props;
  //! const { isCollectionFetching } = this.props;
  //prop dispatched
  //instead of loading, now true/false is in the reducer
  //const { loading } = this.state;

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverviewContainer}
      />
      {/*render is a method that takes a function, where the parameters in the function are 
          just the parameters that the component will recerive. (match, location, history in this case)*/}
      <Route
        exact
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
  /*updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),*/
});

//:categoryId -> allows us to acces this id as a parameter on the match object
//when we are inside our category page
//!params:{collectionId:"hats"}
//path: "/sport-store/shop/:collectionId"
//url: "/sport-store/shop/hats"
export default connect(null, mapDispatchToProps)(ShopPage);
