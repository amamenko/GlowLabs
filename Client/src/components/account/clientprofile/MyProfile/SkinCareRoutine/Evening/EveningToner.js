import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_EVENING_TONER_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/Toner/ProductName/ACTION_EVENING_TONER_PRODUCT_NAME";
import ACTION_EVENING_TONER_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/Toner/ProductFrequency/ACTION_EVENING_TONER_PRODUCT_FREQUENCY";
import ACTION_EVENING_TONER_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/Toner/ProductUseNotes/ACTION_EVENING_TONER_PRODUCT_USE_NOTES";
import ACTION_EVENING_TONER_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/Toner/ProductLink/ACTION_EVENING_TONER_PRODUCT_LINK";
import ACTION_RESET_ALL_EVENING_TONER_FIELDS from "../../../../../../actions/MyRoutine/Evening/Toner/ACTION_RESET_ALL_EVENING_TONER_FIELDS";

const EveningToner = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const eveningTonerProductFrequency = useSelector(
    (state) =>
      state.eveningTonerProductFrequency.evening_toner_product_frequency
  );
  const eveningTonerProductLink = useSelector(
    (state) => state.eveningTonerProductLink.evening_toner_product_link
  );
  const eveningTonerProductName = useSelector(
    (state) => state.eveningTonerProductName.evening_toner_product_name
  );
  const eveningTonerProductUseNotes = useSelector(
    (state) => state.eveningTonerProductUseNotes.evening_toner_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_EVENING_TONER_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_EVENING_TONER_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_EVENING_TONER_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_EVENING_TONER_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_EVENING_TONER_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_toner")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M16.847 47.9c-1.354-.265-2.44-1.156-2.993-2.454l-.228-.533V14.676l.181-.451a4.083 4.083 0 012.675-2.434l.502-.15.002-2.894c0-3.2.03-3.444.492-4.238.348-.598 1.156-1.314 1.798-1.594 1.018-.445 1.078-.45 5.508-.426l4.012.022.544.19c1.42.496 2.392 1.504 2.694 2.797.092.39.117 1.108.118 3.32l.002 2.823.515.154c1.282.384 2.224 1.276 2.666 2.525l.177.498V44.77l-.175.498c-.485 1.384-1.738 2.421-3.217 2.663-.748.122-14.634.094-15.273-.031zm15.563-1.657c.609-.27 1.018-.669 1.25-1.22.149-.352.153-.726.153-15.228 0-14.32-.006-14.881-.147-15.216-.301-.714-.907-1.205-1.72-1.396-.686-.161-14.068-.161-14.754 0-.808.19-1.452.71-1.746 1.41-.112.267-.122 1.78-.103 15.309l.022 15.012.174.293c.377.635.897 1.022 1.603 1.194.372.09 1.468.104 7.587.092l7.152-.014zm-14.927-22.6c-.509-.199-.499-.108-.499-4.524v-3.994l.269-.242.268-.242h14.077l.516.415.022 4.026c.024 4.478.037 4.363-.498 4.564-.395.149-13.775.146-14.154-.003zm13.011-4.484v-3.024H18.643v6.047h11.851zm0-10.235c0-1.505-.035-2.824-.08-3.04-.201-.953-.94-1.646-1.958-1.837-.57-.106-7.205-.106-7.775 0-.787.148-1.479.652-1.83 1.336-.162.317-.17.44-.193 3.264l-.023 2.935h11.859z" />
        </svg>
      </div>
      <h2>Toner</h2>
      <FontAwesomeIcon
        className="skin_care_routine_user_add_icon"
        icon={faPlusCircle}
      />
      <Transition
        items={props.itemToggled}
        from={{ transform: "translateX(-100%)" }}
        enter={{ transform: "translateX(0%)" }}
        leave={{ transform: "translateX(-100%)" }}
        config={{ duration: 200 }}
      >
        {(itemToggled) =>
          itemToggled === "evening_toner" &&
          ((styleprops) => (
            <div
              className="my_individual_selected_item_container"
              style={styleprops}
            >
              <div className="my_individual_selected_item_contents_container">
                <div className="my_individual_selected_item_top_container">
                  <div
                    className="my_individual_selected_item_back_container"
                    ref={props.selectedItemBackRef}
                    onClick={(e) => props.handleAppointmentUntoggled(e)}
                  >
                    <FontAwesomeIcon
                      icon={faLongArrowAltLeft}
                      className="my_individual_selected_item_back_arrow_icon"
                    />
                  </div>
                </div>
                <div className="my_individual_selected_item_header">
                  <p>Toner (PM)</p>
                </div>
              </div>
              {props.addProductClicked ? (
                <div className="my_individual_selected_item_add_product_container">
                  <Form className="add_product_form">
                    <FormGroup className="add_product_form_field">
                      <Label for="productName">
                        {" "}
                        <div className="top_form_container">Product Name</div>
                      </Label>
                      <Input
                        type="text"
                        name="productName"
                        maxLength={50}
                        placeholder="Enter product name"
                        className="input_field_product"
                        defaultValue={eveningTonerProductName}
                        onChange={handleProductName}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="frequencyOfUse">
                        {" "}
                        <div className="top_form_container">
                          Frequency of Use
                        </div>
                      </Label>
                      <Input
                        type="text"
                        name="frequencyOfUse"
                        maxLength={50}
                        placeholder="Enter frequency, e.g. daily, etc."
                        className="input_field_product"
                        defaultValue={eveningTonerProductFrequency}
                        onChange={handleProductFrequency}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="productUsageDetails">
                        Product Usage Details
                      </Label>
                      <Input
                        type="textarea"
                        style={{
                          fontFamily: "Montserrat",
                        }}
                        placeholder="Enter a short description of your product usage here."
                        className="product_usage_notes"
                        maxLength={1000}
                        defaultValue={eveningTonerProductUseNotes}
                        onChange={handleProductUsageDetails}
                      />
                    </FormGroup>
                    <FormGroup className="add_product_form_field">
                      <Label for="productLink">
                        {" "}
                        <div className="top_form_container">Product Link</div>
                      </Label>
                      <Input
                        type="text"
                        name="productLink"
                        maxLength={50}
                        placeholder="Enter a URL link to the product"
                        className="input_field_product"
                        defaultValue={eveningTonerProductLink}
                        onChange={handleProductLink}
                      />
                    </FormGroup>
                  </Form>
                  <div className="my_individual_selected_item_bottom_buttons_container">
                    <div
                      className="my_individual_selected_item_add_product_button"
                      ref={props.submitProductRef}
                      onClick={(e) => props.handleAddProductToggle(e)}
                    >
                      <p>Submit Product</p>
                    </div>
                    <div
                      className="my_individual_selected_item_back_to_routine_button"
                      onClick={() => props.handleBackToOverview()}
                    >
                      <p>Back to Overview</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="my_individual_selected_item_empty_state_container">
                  <div className="my_individual_selected_item_empty_state_icon_container">
                    <svg
                      className="my_individual_selected_item_empty_state_icon"
                      height="5rem"
                      width="100%"
                      viewBox="0 0 50.006 50.006"
                    >
                      <path d="M16.847 47.9c-1.354-.265-2.44-1.156-2.993-2.454l-.228-.533V14.676l.181-.451a4.083 4.083 0 012.675-2.434l.502-.15.002-2.894c0-3.2.03-3.444.492-4.238.348-.598 1.156-1.314 1.798-1.594 1.018-.445 1.078-.45 5.508-.426l4.012.022.544.19c1.42.496 2.392 1.504 2.694 2.797.092.39.117 1.108.118 3.32l.002 2.823.515.154c1.282.384 2.224 1.276 2.666 2.525l.177.498V44.77l-.175.498c-.485 1.384-1.738 2.421-3.217 2.663-.748.122-14.634.094-15.273-.031zm15.563-1.657c.609-.27 1.018-.669 1.25-1.22.149-.352.153-.726.153-15.228 0-14.32-.006-14.881-.147-15.216-.301-.714-.907-1.205-1.72-1.396-.686-.161-14.068-.161-14.754 0-.808.19-1.452.71-1.746 1.41-.112.267-.122 1.78-.103 15.309l.022 15.012.174.293c.377.635.897 1.022 1.603 1.194.372.09 1.468.104 7.587.092l7.152-.014zm-14.927-22.6c-.509-.199-.499-.108-.499-4.524v-3.994l.269-.242.268-.242h14.077l.516.415.022 4.026c.024 4.478.037 4.363-.498 4.564-.395.149-13.775.146-14.154-.003zm13.011-4.484v-3.024H18.643v6.047h11.851zm0-10.235c0-1.505-.035-2.824-.08-3.04-.201-.953-.94-1.646-1.958-1.837-.57-.106-7.205-.106-7.775 0-.787.148-1.479.652-1.83 1.336-.162.317-.17.44-.193 3.264l-.023 2.935h11.859z" />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No afternoon / evening toner information</h2>
                    <p>
                      Start by adding some product information and check back
                      here after
                    </p>
                  </div>
                  <div className="my_individual_selected_item_bottom_buttons_container">
                    <div
                      className="my_individual_selected_item_add_product_button"
                      ref={props.addProductRef}
                      onClick={(e) => props.handleAddProductToggle(e)}
                    >
                      <p>Add Product</p>
                    </div>
                    <div
                      className="my_individual_selected_item_back_to_routine_button"
                      onClick={() => props.changeItemToggled("")}
                    >
                      <p>Back to Routine</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        }
      </Transition>
    </div>
  );
});

export default EveningToner;
