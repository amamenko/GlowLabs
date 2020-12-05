import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_MORNING_SERUM_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/Serum/ProductName/ACTION_MORNING_SERUM_PRODUCT_NAME";
import ACTION_MORNING_SERUM_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/Serum/ProductFrequency/ACTION_MORNING_SERUM_PRODUCT_FREQUENCY";
import ACTION_MORNING_SERUM_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/Serum/ProductUseNotes/ACTION_MORNING_SERUM_PRODUCT_USE_NOTES";
import ACTION_MORNING_SERUM_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/Serum/ProductLink/ACTION_MORNING_SERUM_PRODUCT_LINK";
import ACTION_RESET_ALL_MORNING_SERUM_FIELDS from "../../../../../../actions/MyRoutine/Morning/Serum/ACTION_RESET_ALL_MORNING_SERUM_FIELDS";

const MorningSerum = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const morningSerumProductFrequency = useSelector(
    (state) =>
      state.morningSerumProductFrequency.morning_serum_product_frequency
  );
  const morningSerumProductLink = useSelector(
    (state) => state.morningSerumProductLink.morning_serum_product_link
  );
  const morningSerumProductName = useSelector(
    (state) => state.morningSerumProductName.morning_serum_product_name
  );
  const morningSerumProductUseNotes = useSelector(
    (state) => state.morningSerumProductUseNotes.morning_serum_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_MORNING_SERUM_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_MORNING_SERUM_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_MORNING_SERUM_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_MORNING_SERUM_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_MORNING_SERUM_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_morning_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "morning_serum")}
      ref={props.individualItemMorningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M25.948 48.373c-.45-.15-1.22-.996-1.358-1.493-.162-.58-.162-21.14 0-21.72.149-.535.91-1.343 1.415-1.501.234-.074.994-.119 1.998-.119h1.62v-2.1c0-2.1 0-2.101.226-2.34l.225-.24h7.918l.225.24c.226.239.226.24.226 2.34v2.1h1.62c1.004 0 1.764.045 1.998.119.505.158 1.266.966 1.415 1.501.162.58.162 21.14 0 21.72-.149.536-.91 1.344-1.415 1.502-.512.16-15.63.152-16.113-.009zm15.901-1.718l.269-.285v-20.7l-.538-.57h-4.156l-.226-.239c-.185-.196-.225-.336-.225-.78v-.54h-1.47v-1.56h1.47v-1.56h-5.88v1.56h3.675v1.56h-3.675v.54c0 .444-.04.584-.226.78l-.225.24h-4.157l-.269.285-.268.285v20.7l.537.57H41.58zm-14.241-1.531c-.19-.256-.19-.306-.19-8.731v-8.474l.45-.479h6.148c6.08 0 6.15.003 6.39.203l.241.202v17.057l-.225.239c-.208.22-.294.24-1.103.24h-.877v-1.56h.735V29h-10.29v14.82h8.085v1.56h-9.174zm-19.546 1c-.85-.295-1.535-.965-1.944-1.902-.198-.452-.239-.683-.233-1.328.006-.752.05-.91 1.264-4.436.816-2.37 1.326-3.716 1.449-3.827a.773.773 0 01.445-.17c.14 0 .34.076.445.17.123.11.633 1.457 1.448 3.827 1.214 3.526 1.26 3.684 1.265 4.436.005.646-.035.875-.236 1.334-.32.734-.898 1.381-1.521 1.705-.61.317-1.753.408-2.382.19zm1.651-1.558c.627-.278 1.17-1.276 1.034-1.904-.087-.404-1.653-4.983-1.704-4.983-.051 0-1.618 4.58-1.705 4.983-.133.616.401 1.617 1.014 1.9.362.168.988.17 1.361.004zm-1.18-12.685c-.224-.237-.225-.253-.225-2.12v-1.88l16.577-17.595-.939-1.012c-1.289-1.39-1.302-1.272.343-3.03 1.228-1.313 1.297-1.37 1.654-1.37.35 0 .43.061 1.29.97l.917.97 2.189-2.31c2.368-2.5 2.603-2.681 3.604-2.778 1.09-.104 2.19.568 2.734 1.67.207.42.246.622.246 1.278.001 1.256-.087 1.394-2.59 4.065l-2.174 2.32.937 1.01c1.292 1.394 1.307 1.273-.376 3.059-1.683 1.786-1.568 1.77-2.883.397l-.954-.996L12.3 32.121h-1.77c-1.758 0-1.773-.002-1.996-.24zm11.213-9.9l8.085-8.58-1.883-1.998-16.17 17.159v1.999h1.884z" />
        </svg>
      </div>
      <h2>Serum</h2>
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
          itemToggled === "morning_serum" &&
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
                  <p>Serum (AM)</p>
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
                        defaultValue={morningSerumProductName}
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
                        defaultValue={morningSerumProductFrequency}
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
                        defaultValue={morningSerumProductUseNotes}
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
                        defaultValue={morningSerumProductLink}
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
                      <path d="M25.948 48.373c-.45-.15-1.22-.996-1.358-1.493-.162-.58-.162-21.14 0-21.72.149-.535.91-1.343 1.415-1.501.234-.074.994-.119 1.998-.119h1.62v-2.1c0-2.1 0-2.101.226-2.34l.225-.24h7.918l.225.24c.226.239.226.24.226 2.34v2.1h1.62c1.004 0 1.764.045 1.998.119.505.158 1.266.966 1.415 1.501.162.58.162 21.14 0 21.72-.149.536-.91 1.344-1.415 1.502-.512.16-15.63.152-16.113-.009zm15.901-1.718l.269-.285v-20.7l-.538-.57h-4.156l-.226-.239c-.185-.196-.225-.336-.225-.78v-.54h-1.47v-1.56h1.47v-1.56h-5.88v1.56h3.675v1.56h-3.675v.54c0 .444-.04.584-.226.78l-.225.24h-4.157l-.269.285-.268.285v20.7l.537.57H41.58zm-14.241-1.531c-.19-.256-.19-.306-.19-8.731v-8.474l.45-.479h6.148c6.08 0 6.15.003 6.39.203l.241.202v17.057l-.225.239c-.208.22-.294.24-1.103.24h-.877v-1.56h.735V29h-10.29v14.82h8.085v1.56h-9.174zm-19.546 1c-.85-.295-1.535-.965-1.944-1.902-.198-.452-.239-.683-.233-1.328.006-.752.05-.91 1.264-4.436.816-2.37 1.326-3.716 1.449-3.827a.773.773 0 01.445-.17c.14 0 .34.076.445.17.123.11.633 1.457 1.448 3.827 1.214 3.526 1.26 3.684 1.265 4.436.005.646-.035.875-.236 1.334-.32.734-.898 1.381-1.521 1.705-.61.317-1.753.408-2.382.19zm1.651-1.558c.627-.278 1.17-1.276 1.034-1.904-.087-.404-1.653-4.983-1.704-4.983-.051 0-1.618 4.58-1.705 4.983-.133.616.401 1.617 1.014 1.9.362.168.988.17 1.361.004zm-1.18-12.685c-.224-.237-.225-.253-.225-2.12v-1.88l16.577-17.595-.939-1.012c-1.289-1.39-1.302-1.272.343-3.03 1.228-1.313 1.297-1.37 1.654-1.37.35 0 .43.061 1.29.97l.917.97 2.189-2.31c2.368-2.5 2.603-2.681 3.604-2.778 1.09-.104 2.19.568 2.734 1.67.207.42.246.622.246 1.278.001 1.256-.087 1.394-2.59 4.065l-2.174 2.32.937 1.01c1.292 1.394 1.307 1.273-.376 3.059-1.683 1.786-1.568 1.77-2.883.397l-.954-.996L12.3 32.121h-1.77c-1.758 0-1.773-.002-1.996-.24zm11.213-9.9l8.085-8.58-1.883-1.998-16.17 17.159v1.999h1.884z" />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No morning serum information</h2>
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

export default MorningSerum;
