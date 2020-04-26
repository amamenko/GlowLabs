import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import ACTION_SPF_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/SPF/ProductName/ACTION_SPF_PRODUCT_NAME";
import ACTION_SPF_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/SPF/ProductFrequency/ACTION_SPF_PRODUCT_FREQUENCY";
import ACTION_SPF_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/SPF/ProductUseNotes/ACTION_SPF_PRODUCT_USE_NOTES";
import ACTION_SPF_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/SPF/ProductLink/ACTION_SPF_PRODUCT_LINK";
import { useDispatch, useSelector } from "react-redux";
import ACTION_RESET_ALL_SPF_FIELDS from "../../../../../../actions/MyRoutine/Morning/SPF/ACTION_RESET_ALL_SPF_FIELDS";

const MorningSPF = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const spfProductFrequency = useSelector(
    (state) => state.spfProductFrequency.spf_product_frequency
  );
  const spfProductLink = useSelector(
    (state) => state.spfProductLink.spf_product_link
  );
  const spfProductName = useSelector(
    (state) => state.spfProductName.spf_product_name
  );
  const spfProductUseNotes = useSelector(
    (state) => state.spfProductUseNotes.spf_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_SPF_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(ACTION_SPF_PRODUCT_FREQUENCY(e.currentTarget.value.trim()));
  };

  const handleProductUsageDetails = (e) => {
    dispatch(ACTION_SPF_PRODUCT_USE_NOTES(e.currentTarget.value.trim()));
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_SPF_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_SPF_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_morning_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "morning_spf")}
      ref={props.individualItemMorningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M18.26 43.005c0-3.431-.06-4.147-.363-4.395-1.504-1.227-3-6.15-3.928-12.932-.667-4.867-1.531-16.786-1.533-21.132v-.973h26.328l-.127 2.691c-.654 13.945-1.403 21.041-2.797 26.495-.624 2.442-1.701 4.977-2.446 5.757-.398.417-.452.895-.51 4.467l-.063 4-14.561.121zm13.28 2.374c0-.274-.345-.344-1.703-.344-1.136 0-1.853-.111-2.155-.336-.627-.466-3.666-.478-4.056-.016-.195.231-.864.355-2.164.4-1.249.045-1.915.163-1.98.353-.075.224 1.224.287 5.981.287 5.247 0 6.077-.047 6.077-.344zm-8.27-1.947c.992-.646 3.935-.646 4.775 0 .435.334.953.45 2.039.453l1.456.005v-4.582H19.425v2.139c0 1.175.07 2.206.155 2.29.086.084.793.152 1.573.152 1.022-.002 1.612-.129 2.116-.457zm9.307-5.863c2.09-2.055 4.108-14.198 4.604-27.697l.067-1.833-1.34-.069c-1.247-.064-1.34-.107-1.34-.63 0-.533.07-.56 1.399-.56h1.397V4.716h-23.53V6.78h18.871v1.145h-18.87v.634c0 .349.105 2.282.235 4.296.833 12.945 2.362 21.867 4.177 24.374l.512.706h6.723c5.844 0 6.773-.048 7.096-.365zm-7.56-7.195c0-.824.058-.916.582-.916.524 0 .583.092.583.916s-.059.917-.583.917-.582-.092-.582-.917zm-5.366-1.497c-.248-.294-.189-.462.363-1.029.622-.638.685-.655 1.089-.296.414.369.407.404-.202 1.03-.728.746-.845.774-1.25.295zm10.485-.226c-.552-.578-.552-.58-.088-1.035.464-.456.465-.456 1.13.226.557.572.617.74.369 1.035-.42.496-.775.44-1.41-.226zm-5.51-.369c-3.164-.548-5.05-3.499-4.16-6.51.693-2.342 2.62-3.768 5.092-3.768 3.047 0 5.283 2.215 5.283 5.234 0 3.269-2.896 5.62-6.215 5.044zm3.31-1.907c.95-.713 1.727-2.156 1.734-3.225.008-1.008-.919-2.656-1.826-3.248-1.601-1.047-3.473-.958-4.848.229-2.306 1.99-1.805 5.455.972 6.724 1.109.507 2.95.284 3.969-.48zm-10.608-3.217c0-.515.093-.572.932-.572s.932.057.932.572c0 .516-.093.573-.932.573s-.932-.057-.932-.573zm14.444 0c0-.526.085-.572 1.048-.572.963 0 1.049.046 1.049.572 0 .526-.086.573-1.049.573s-1.048-.047-1.048-.573zM19.93 18.62c-.6-.627-.632-.914-.149-1.309.3-.244.47-.186 1.047.357.646.608.665.675.305 1.066-.493.535-.593.525-1.203-.114zm10.14.123c-.371-.403-.355-.462.308-1.086.66-.622.723-.638 1.098-.269.376.37.358.431-.308 1.086-.683.673-.719.681-1.098.269zm-5.055-2.8c0-.824.058-.916.582-.916.524 0 .583.092.583.917 0 .824-.059.916-.583.916s-.582-.092-.582-.916z" />
        </svg>
      </div>
      <h2>SPF</h2>
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
          itemToggled === "morning_spf" &&
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
                  <p>SPF</p>
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
                        defaultValue={spfProductName}
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
                        defaultValue={spfProductFrequency}
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
                        defaultValue={spfProductUseNotes}
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
                        defaultValue={spfProductLink}
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
                      <path d="M18.26 43.005c0-3.431-.06-4.147-.363-4.395-1.504-1.227-3-6.15-3.928-12.932-.667-4.867-1.531-16.786-1.533-21.132v-.973h26.328l-.127 2.691c-.654 13.945-1.403 21.041-2.797 26.495-.624 2.442-1.701 4.977-2.446 5.757-.398.417-.452.895-.51 4.467l-.063 4-14.561.121zm13.28 2.374c0-.274-.345-.344-1.703-.344-1.136 0-1.853-.111-2.155-.336-.627-.466-3.666-.478-4.056-.016-.195.231-.864.355-2.164.4-1.249.045-1.915.163-1.98.353-.075.224 1.224.287 5.981.287 5.247 0 6.077-.047 6.077-.344zm-8.27-1.947c.992-.646 3.935-.646 4.775 0 .435.334.953.45 2.039.453l1.456.005v-4.582H19.425v2.139c0 1.175.07 2.206.155 2.29.086.084.793.152 1.573.152 1.022-.002 1.612-.129 2.116-.457zm9.307-5.863c2.09-2.055 4.108-14.198 4.604-27.697l.067-1.833-1.34-.069c-1.247-.064-1.34-.107-1.34-.63 0-.533.07-.56 1.399-.56h1.397V4.716h-23.53V6.78h18.871v1.145h-18.87v.634c0 .349.105 2.282.235 4.296.833 12.945 2.362 21.867 4.177 24.374l.512.706h6.723c5.844 0 6.773-.048 7.096-.365zm-7.56-7.195c0-.824.058-.916.582-.916.524 0 .583.092.583.916s-.059.917-.583.917-.582-.092-.582-.917zm-5.366-1.497c-.248-.294-.189-.462.363-1.029.622-.638.685-.655 1.089-.296.414.369.407.404-.202 1.03-.728.746-.845.774-1.25.295zm10.485-.226c-.552-.578-.552-.58-.088-1.035.464-.456.465-.456 1.13.226.557.572.617.74.369 1.035-.42.496-.775.44-1.41-.226zm-5.51-.369c-3.164-.548-5.05-3.499-4.16-6.51.693-2.342 2.62-3.768 5.092-3.768 3.047 0 5.283 2.215 5.283 5.234 0 3.269-2.896 5.62-6.215 5.044zm3.31-1.907c.95-.713 1.727-2.156 1.734-3.225.008-1.008-.919-2.656-1.826-3.248-1.601-1.047-3.473-.958-4.848.229-2.306 1.99-1.805 5.455.972 6.724 1.109.507 2.95.284 3.969-.48zm-10.608-3.217c0-.515.093-.572.932-.572s.932.057.932.572c0 .516-.093.573-.932.573s-.932-.057-.932-.573zm14.444 0c0-.526.085-.572 1.048-.572.963 0 1.049.046 1.049.572 0 .526-.086.573-1.049.573s-1.048-.047-1.048-.573zM19.93 18.62c-.6-.627-.632-.914-.149-1.309.3-.244.47-.186 1.047.357.646.608.665.675.305 1.066-.493.535-.593.525-1.203-.114zm10.14.123c-.371-.403-.355-.462.308-1.086.66-.622.723-.638 1.098-.269.376.37.358.431-.308 1.086-.683.673-.719.681-1.098.269zm-5.055-2.8c0-.824.058-.916.582-.916.524 0 .583.092.583.917 0 .824-.059.916-.583.916s-.582-.092-.582-.916z" />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No SPF information</h2>
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

export default MorningSPF;
