import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_EVENING_MOISTURIZER_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/Moisturizer/ProductName/ACTION_EVENING_MOISTURIZER_PRODUCT_NAME";
import ACTION_EVENING_MOISTURIZER_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/Moisturizer/ProductFrequency/ACTION_EVENING_MOISTURIZER_PRODUCT_FREQUENCY";
import ACTION_EVENING_MOISTURIZER_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/Moisturizer/ProductLink/ACTION_EVENING_MOISTURIZER_PRODUCT_LINK";
import ACTION_EVENING_MOISTURIZER_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/Moisturizer/ProductUseNotes/ACTION_EVENING_MOISTURIZER_PRODUCT_USE_NOTES";
import ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS from "../../../../../../actions/MyRoutine/Evening/Moisturizer/ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS";

const EveningMoisturizer = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const eveningMoisturizerProductFrequency = useSelector(
    (state) =>
      state.eveningMoisturizerProductFrequency
        .evening_moisturizer_product_frequency
  );
  const eveningMoisturizerProductLink = useSelector(
    (state) =>
      state.eveningMoisturizerProductLink.evening_moisturizer_product_link
  );
  const eveningMoisturizerProductName = useSelector(
    (state) =>
      state.eveningMoisturizerProductName.evening_moisturizer_product_name
  );
  const eveningMoisturizerProductUseNotes = useSelector(
    (state) =>
      state.eveningMoisturizerProductUseNotes
        .evening_moisturizer_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(
      ACTION_EVENING_MOISTURIZER_PRODUCT_NAME(e.currentTarget.value.trim())
    );
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_EVENING_MOISTURIZER_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_EVENING_MOISTURIZER_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(
      ACTION_EVENING_MOISTURIZER_PRODUCT_LINK(e.currentTarget.value.trim())
    );
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_EVENING_MOISTURIZER_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_moisturizer")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M11.545 46.731c-2.98-.902-5.427-3.695-6.204-7.078-.236-1.029-.314-2.606-.314-6.375 0-4.588.035-5.084.416-5.925.228-.504.64-1.033.916-1.174.498-.256.5-.271.5-3.616 0-2.306.077-3.444.244-3.633.15-.168.88-.275 1.884-.275h1.64l.457-1.332c1.046-3.039 3.823-6.837 6.86-9.384 2.596-2.177 8.314-5.109 9.286-4.761.51.182.653.854.4 1.878-.117.477-.214 1.56-.214 2.408-.003 3.972 2.48 7.48 7.193 10.165l1.802 1.026h2.916c2.38 0 2.974.066 3.235.36.26.293.32.958.32 3.57v3.21l.638.605c1.095 1.038 1.194 1.61 1.19 6.87-.003 6.721-.48 8.643-2.741 11.052-1.217 1.297-2.269 1.952-3.906 2.433-1.713.503-24.848.481-26.518-.025zm27.311-2.12c1.532-.858 2.72-2.191 3.46-3.884l.668-1.53.064-5.397c.053-4.49.013-5.473-.238-5.855-.298-.453-.538-.459-17.8-.459-17.134 0-17.507.01-17.942.453-.436.445-.443.545-.378 5.964.065 5.38.08 5.542.595 6.773.889 2.125 2.69 3.823 4.607 4.342.424.115 6.417.19 13.385.17l12.618-.04zm2.398-21.598V20.49H8.487v5.047h32.767zm-20.92-5.333c-1.034-1.71-1.327-2.92-1.22-5.02.076-1.474.177-1.938.473-2.182.464-.383.538-.384.99-.012.327.27.339.432.119 1.693-.316 1.807.097 3.581 1.135 4.876 1.24 1.547 1.533 1.62 6.529 1.62h4.444l-1.32-1c-.727-.55-1.938-1.737-2.692-2.638-2.05-2.451-2.997-4.873-3.002-7.673-.003-1.514-.194-1.534-.849-.088-.42.93-.46 1.447-.32 4.173.043.848.004.923-.517.99-.48.063-.61-.049-.865-.737-.347-.934-.4-3.486-.092-4.399.115-.34.165-.67.112-.73-.188-.212-3.596 2.106-5.206 3.542-1.93 1.72-3.646 4.008-4.83 6.444-.475.974-.864 1.85-.866 1.944-.001.095 1.925.172 4.281.172h4.284l-.589-.975z" />
        </svg>
      </div>
      <h2>Moisturizer</h2>
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
          itemToggled === "evening_moisturizer" &&
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
                  <p>Moisturizer (PM)</p>
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
                        defaultValue={eveningMoisturizerProductName}
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
                        defaultValue={eveningMoisturizerProductFrequency}
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
                        defaultValue={eveningMoisturizerProductUseNotes}
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
                        defaultValue={eveningMoisturizerProductLink}
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
                      <path d="M11.545 46.731c-2.98-.902-5.427-3.695-6.204-7.078-.236-1.029-.314-2.606-.314-6.375 0-4.588.035-5.084.416-5.925.228-.504.64-1.033.916-1.174.498-.256.5-.271.5-3.616 0-2.306.077-3.444.244-3.633.15-.168.88-.275 1.884-.275h1.64l.457-1.332c1.046-3.039 3.823-6.837 6.86-9.384 2.596-2.177 8.314-5.109 9.286-4.761.51.182.653.854.4 1.878-.117.477-.214 1.56-.214 2.408-.003 3.972 2.48 7.48 7.193 10.165l1.802 1.026h2.916c2.38 0 2.974.066 3.235.36.26.293.32.958.32 3.57v3.21l.638.605c1.095 1.038 1.194 1.61 1.19 6.87-.003 6.721-.48 8.643-2.741 11.052-1.217 1.297-2.269 1.952-3.906 2.433-1.713.503-24.848.481-26.518-.025zm27.311-2.12c1.532-.858 2.72-2.191 3.46-3.884l.668-1.53.064-5.397c.053-4.49.013-5.473-.238-5.855-.298-.453-.538-.459-17.8-.459-17.134 0-17.507.01-17.942.453-.436.445-.443.545-.378 5.964.065 5.38.08 5.542.595 6.773.889 2.125 2.69 3.823 4.607 4.342.424.115 6.417.19 13.385.17l12.618-.04zm2.398-21.598V20.49H8.487v5.047h32.767zm-20.92-5.333c-1.034-1.71-1.327-2.92-1.22-5.02.076-1.474.177-1.938.473-2.182.464-.383.538-.384.99-.012.327.27.339.432.119 1.693-.316 1.807.097 3.581 1.135 4.876 1.24 1.547 1.533 1.62 6.529 1.62h4.444l-1.32-1c-.727-.55-1.938-1.737-2.692-2.638-2.05-2.451-2.997-4.873-3.002-7.673-.003-1.514-.194-1.534-.849-.088-.42.93-.46 1.447-.32 4.173.043.848.004.923-.517.99-.48.063-.61-.049-.865-.737-.347-.934-.4-3.486-.092-4.399.115-.34.165-.67.112-.73-.188-.212-3.596 2.106-5.206 3.542-1.93 1.72-3.646 4.008-4.83 6.444-.475.974-.864 1.85-.866 1.944-.001.095 1.925.172 4.281.172h4.284l-.589-.975z" />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No afternoon / evening moisturizer information</h2>
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

export default EveningMoisturizer;
