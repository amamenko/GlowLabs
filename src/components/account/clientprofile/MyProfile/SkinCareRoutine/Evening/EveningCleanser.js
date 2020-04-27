import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS from "../../../../../../actions/MyRoutine/Evening/Cleanser/ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS";
import ACTION_EVENING_CLEANSER_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/Cleanser/ProductLink/ACTION_EVENING_CLEANSER_PRODUCT_LINK";
import ACTION_EVENING_CLEANSER_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/Cleanser/ProductFrequency/ACTION_EVENING_CLEANSER_PRODUCT_FREQUENCY";
import ACTION_EVENING_CLEANSER_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/Cleanser/ProductName/ACTION_EVENING_CLEANSER_PRODUCT_NAME";
import ACTION_EVENING_CLEANSER_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/Cleanser/ProductUseNotes/ACTION_EVENING_CLEANSER_PRODUCT_USE_NOTES";

const EveningCleanser = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const eveningCleanserProductFrequency = useSelector(
    (state) =>
      state.eveningCleanserProductFrequency.evening_cleanser_product_frequency
  );
  const eveningCleanserProductLink = useSelector(
    (state) => state.eveningCleanserProductLink.evening_cleanser_product_link
  );
  const eveningCleanserProductName = useSelector(
    (state) => state.eveningCleanserProductName.evening_cleanser_product_name
  );
  const eveningCleanserProductUseNotes = useSelector(
    (state) =>
      state.eveningCleanserProductUseNotes.evening_cleanser_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(
      ACTION_EVENING_CLEANSER_PRODUCT_NAME(e.currentTarget.value.trim())
    );
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_EVENING_CLEANSER_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_EVENING_CLEANSER_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(
      ACTION_EVENING_CLEANSER_PRODUCT_LINK(e.currentTarget.value.trim())
    );
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_EVENING_CLEANSER_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_cleanser")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg viewBox="0 0 50.006 50.006" height="3rem" width="100%">
          <path
            strokeWidth=".794"
            d="M20.737 48.765c-.497-.363-.516-.883-.586-16.044-.082-17.693-.177-16.822 1.854-16.968l1.129-.082.146-7.805h1.574V5.192c0-2.638-.008-2.673-.596-2.537-.327.076-1.875.285-3.44.464l-2.844.326v1.02c0 .844-.091 1.02-.529 1.02-.458 0-.529-.176-.529-1.307 0-.72.11-1.375.244-1.458.757-.468 8.456-1.213 11.83-1.145l3.668.073.15 6.185 1.438.165.146 7.806h1.01c1.992 0 1.886-.933 1.886 16.623 0 15.303-.012 15.668-.529 16.185-.504.504-.882.529-8.019.529-6.05 0-7.589-.072-8.004-.376zm15.43-16.359l-.068-15.676-6.88-.074c-3.783-.041-7.146-.01-7.474.07l-.595.146v15.43c0 8.485.08 15.507.176 15.604.097.097 3.492.177 7.543.177h7.366zm-2.979-20.174v-3.44l-8.863-.145v7.17l8.863-.145zm-1.455-7.011V2.575h-5.82v5.291h5.82z"
            stroke="#000"
            strokeOpacity="1"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h2>Cleanser</h2>
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
          itemToggled === "evening_cleanser" &&
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
                  <p>Cleanser (PM)</p>
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
                        defaultValue={eveningCleanserProductName}
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
                        defaultValue={eveningCleanserProductFrequency}
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
                        defaultValue={eveningCleanserProductUseNotes}
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
                        defaultValue={eveningCleanserProductLink}
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
                      <path
                        strokeWidth=".794"
                        d="M20.737 48.765c-.497-.363-.516-.883-.586-16.044-.082-17.693-.177-16.822 1.854-16.968l1.129-.082.146-7.805h1.574V5.192c0-2.638-.008-2.673-.596-2.537-.327.076-1.875.285-3.44.464l-2.844.326v1.02c0 .844-.091 1.02-.529 1.02-.458 0-.529-.176-.529-1.307 0-.72.11-1.375.244-1.458.757-.468 8.456-1.213 11.83-1.145l3.668.073.15 6.185 1.438.165.146 7.806h1.01c1.992 0 1.886-.933 1.886 16.623 0 15.303-.012 15.668-.529 16.185-.504.504-.882.529-8.019.529-6.05 0-7.589-.072-8.004-.376zm15.43-16.359l-.068-15.676-6.88-.074c-3.783-.041-7.146-.01-7.474.07l-.595.146v15.43c0 8.485.08 15.507.176 15.604.097.097 3.492.177 7.543.177h7.366zm-2.979-20.174v-3.44l-8.863-.145v7.17l8.863-.145zm-1.455-7.011V2.575h-5.82v5.291h5.82z"
                        strokeOpacity="1"
                        strokeMiterlimit="4"
                        strokeDasharray="none"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No afternoon / evening cleanser information</h2>
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

export default EveningCleanser;
