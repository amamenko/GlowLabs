import React from "react";
import { Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import GuestCheckout from "./GuestCheckout";
import ConfirmationPage from "./ConfirmationPage";
import ConsentFormPage1 from "../account/clientprofile/ConsentForm/Pages/Page1/ConsentFormPage1";
import ConsentFormPage2 from "../account/clientprofile/ConsentForm/Pages/Page2/ConsentFormPage2";
import ConsentFormPage3 from "../account/clientprofile/ConsentForm/Pages/Page3/ConsentFormPage3";
import ConsentFormPage4 from "../account/clientprofile/ConsentForm/Pages/Page4/ConsentFormPage4";
import ConsentFormPage5 from "../account/clientprofile/ConsentForm/Pages/Page5/ConsentFormPage5";
import ConsentFormPage6 from "../account/clientprofile/ConsentForm/Pages/Page6/ConsentFormPage6";
import ConsentFormPage7 from "../account/clientprofile/ConsentForm/Pages/Page7/ConsentFormPage7";

const CheckoutRouter = (props) => {
  const { path, initialScreenSize, currentScreenSize } = props;

  const cartPageOpened = useSelector(
    (state) => state.cartPageOpened.cart_page_opened
  );

  return (
    <Switch>
      {cartPageOpened === "GuestCheckout" ? (
        <Route
          exact
          path={path}
          render={() => (
            <GuestCheckout
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
      ) : cartPageOpened === "ConfirmationPage" ? (
        <Route
          exact
          path={path + "/confirmation"}
          render={() => (
            <ConfirmationPage
              initialScreenSize={initialScreenSize}
              currentScreenSize={currentScreenSize}
            />
          )}
        />
      ) : (
        <>
          <Route
            exact
            path={path + "/confirmation/consentform/page1"}
            render={() => (
              <ConsentFormPage1
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page2"}
            render={() => (
              <ConsentFormPage2
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page3"}
            render={() => (
              <ConsentFormPage3
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page4"}
            render={() => (
              <ConsentFormPage4
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page5"}
            render={() => (
              <ConsentFormPage5
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page6"}
            render={() => (
              <ConsentFormPage6
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
          <Route
            exact
            path={path + "/confirmation/consentform/page7"}
            render={() => (
              <ConsentFormPage7
                initialScreenSize={initialScreenSize}
                currentScreenSize={currentScreenSize}
              />
            )}
          />
        </>
      )}
    </Switch>
  );
};

export default CheckoutRouter;
