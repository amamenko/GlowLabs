import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_OIL_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/Oil/ProductName/ACTION_OIL_PRODUCT_NAME";
import ACTION_OIL_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/Oil/ProductFrequency/ACTION_OIL_PRODUCT_FREQUENCY";
import ACTION_OIL_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/Oil/ProductLink/ACTION_OIL_PRODUCT_LINK";
import ACTION_OIL_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/Oil/ProductUseNotes/ACTION_OIL_PRODUCT_USE_NOTES";
import ACTION_RESET_ALL_OIL_FIELDS from "../../../../../../actions/MyRoutine/Evening/Oil/ACTION_RESET_ALL_OIL_FIELDS";

const EveningOil = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const oilProductFrequency = useSelector(
    (state) => state.oilProductFrequency.oil_product_frequency
  );
  const oilProductLink = useSelector(
    (state) => state.oilProductLink.oil_product_link
  );
  const oilProductName = useSelector(
    (state) => state.oilProductName.oil_product_name
  );
  const oilProductUseNotes = useSelector(
    (state) => state.oilProductUseNotes.oil_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_OIL_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(ACTION_OIL_PRODUCT_FREQUENCY(e.currentTarget.value.trim()));
  };

  const handleProductUsageDetails = (e) => {
    dispatch(ACTION_OIL_PRODUCT_USE_NOTES(e.currentTarget.value.trim()));
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_OIL_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_OIL_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_oil")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M17.587 48.028c-1.094-.102-2.098-.52-2.863-1.188A3.658 3.658 0 0113.568 45l-.075-.29v-7.444c0-7.032.004-7.466.058-7.825a8.596 8.596 0 011.193-3.31 9.737 9.737 0 011.554-1.956 14.257 14.257 0 011.472-1.207l.309-.21v-4.549c0-4.47 0-4.551.063-4.688a.775.775 0 01.417-.402l.17-.078 2.369-.026.328-.823.329-.822-.036-.451a38.846 38.846 0 01-.037-1.883c-.002-1.476.027-1.966.16-2.73.304-1.74.923-2.88 1.88-3.464 1.03-.627 2.433-.617 3.465.027.725.452 1.268 1.264 1.598 2.393.392 1.336.505 3.045.366 5.534l-.032.59.33.815.329.814 1.171.013c1.107.012 1.18.016 1.317.069a.942.942 0 01.449.374l.072.121.008 4.587.009 4.586.23.153c1.297.868 2.416 2.043 3.167 3.332.704 1.207 1.072 2.378 1.172 3.729.024.33.031 2.625.023 7.602-.01 6.564-.015 7.147-.064 7.344-.401 1.605-1.783 2.737-3.752 3.075-.232.04-.923.044-7.996.048-4.46.003-7.85-.006-7.997-.019zm15.586-1.52c.908-.103 1.724-.599 2.12-1.288.06-.107.143-.295.183-.418l.071-.223v-7.34c0-6.963-.002-7.359-.058-7.708-.361-2.285-1.745-4.285-3.91-5.649l-.308-.193h-3.07l-.007 8.935-.009 8.935-.069.2c-.234.677-.755 1.202-1.486 1.495a3.34 3.34 0 01-2.347.014c-.823-.314-1.408-.951-1.57-1.708-.023-.106-.033-2.938-.033-9.013v-8.859h-3.076l-.31.195c-1.867 1.166-3.222 2.916-3.734 4.821a11.63 11.63 0 00-.154.683l-.073.38v14.864l.075.21c.227.64.744 1.157 1.45 1.451.23.096.563.182.824.214.288.034 15.186.035 15.49 0zm-7.345-4.623a.92.92 0 00.432-.353l.085-.13.008-8.857.008-8.856h-1.84v8.818c0 7.957.004 8.831.049 8.94.088.214.35.414.648.496.13.035.461.004.61-.058zm5.134-23.528V14.55H19.919v7.616h11.043zm-3.142-5.362c0-.018-.123-.34-.274-.716l-.274-.684.044-.788c.054-.962.055-2.729.002-3.335-.116-1.317-.328-2.156-.704-2.786-.216-.361-.467-.615-.707-.714a1.273 1.273 0 00-.892-.021c-.148.05-.41.255-.558.436-.455.555-.747 1.516-.889 2.928-.062.622-.076 2.057-.028 3.002.068 1.366.08 1.257-.191 1.921-.127.311-.25.615-.274.677l-.043.111h2.394c1.841 0 2.394-.007 2.394-.031z" />
          <path
            d="M27.119 34.531c.353-.213.76-.274 1.152-.332.331-.066.654-.012.976.073.281.075.541.217.804.347.414.184.829.368 1.244.55.462.204.949.326 1.437.425.392.073.789.09 1.185.075.375-.008.718-.16 1.051-.339.465-.245.888-.574 1.334-.856-1.613.949-.23.291.145-.12l-.833.376v0c-.64.512 2.435-1.645-.145.101l-.21.143c-.035.024-.14.093-.104.07.802-.505.822-.514.5-.327-.326.184-.657.358-1.03.373a5.25 5.25 0 01-1.179-.054c-.486-.09-.97-.207-1.43-.408-.412-.179-.821-.368-1.232-.552-.266-.133-.527-.284-.812-.363-.33-.089-.66-.165-1-.098-.392.055-.796.11-1.16.292l-.693.624zM14.294 35.119c.353-.213.76-.274 1.152-.332.331-.066.654-.012.976.073.281.075.541.217.804.347.414.184.829.368 1.244.55.462.204.949.326 1.437.425.392.073.789.09 1.185.075.375-.008.718-.16 1.051-.339.465-.245.888-.574 1.334-.856-1.613.949-.23.291.145-.12l-.833.376v0c-.64.512 2.435-1.645-.145.101l-.21.143c-.035.024-.14.093-.104.07.802-.505.822-.514.5-.327-.326.184-.657.358-1.03.373a5.25 5.25 0 01-1.179-.054c-.486-.09-.97-.207-1.43-.408-.412-.179-.821-.368-1.232-.552-.266-.133-.527-.284-.812-.363-.33-.089-.66-.165-1-.098-.392.055-.796.11-1.16.292l-.693.624z"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.274"
          />
        </svg>
      </div>
      <h2>Oil</h2>
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
          itemToggled === "evening_oil" &&
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
                  <p>Oil</p>
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
                        defaultValue={oilProductName}
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
                        defaultValue={oilProductFrequency}
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
                        defaultValue={oilProductUseNotes}
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
                        defaultValue={oilProductLink}
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
                      <path d="M17.587 48.028c-1.094-.102-2.098-.52-2.863-1.188A3.658 3.658 0 0113.568 45l-.075-.29v-7.444c0-7.032.004-7.466.058-7.825a8.596 8.596 0 011.193-3.31 9.737 9.737 0 011.554-1.956 14.257 14.257 0 011.472-1.207l.309-.21v-4.549c0-4.47 0-4.551.063-4.688a.775.775 0 01.417-.402l.17-.078 2.369-.026.328-.823.329-.822-.036-.451a38.846 38.846 0 01-.037-1.883c-.002-1.476.027-1.966.16-2.73.304-1.74.923-2.88 1.88-3.464 1.03-.627 2.433-.617 3.465.027.725.452 1.268 1.264 1.598 2.393.392 1.336.505 3.045.366 5.534l-.032.59.33.815.329.814 1.171.013c1.107.012 1.18.016 1.317.069a.942.942 0 01.449.374l.072.121.008 4.587.009 4.586.23.153c1.297.868 2.416 2.043 3.167 3.332.704 1.207 1.072 2.378 1.172 3.729.024.33.031 2.625.023 7.602-.01 6.564-.015 7.147-.064 7.344-.401 1.605-1.783 2.737-3.752 3.075-.232.04-.923.044-7.996.048-4.46.003-7.85-.006-7.997-.019zm15.586-1.52c.908-.103 1.724-.599 2.12-1.288.06-.107.143-.295.183-.418l.071-.223v-7.34c0-6.963-.002-7.359-.058-7.708-.361-2.285-1.745-4.285-3.91-5.649l-.308-.193h-3.07l-.007 8.935-.009 8.935-.069.2c-.234.677-.755 1.202-1.486 1.495a3.34 3.34 0 01-2.347.014c-.823-.314-1.408-.951-1.57-1.708-.023-.106-.033-2.938-.033-9.013v-8.859h-3.076l-.31.195c-1.867 1.166-3.222 2.916-3.734 4.821a11.63 11.63 0 00-.154.683l-.073.38v14.864l.075.21c.227.64.744 1.157 1.45 1.451.23.096.563.182.824.214.288.034 15.186.035 15.49 0zm-7.345-4.623a.92.92 0 00.432-.353l.085-.13.008-8.857.008-8.856h-1.84v8.818c0 7.957.004 8.831.049 8.94.088.214.35.414.648.496.13.035.461.004.61-.058zm5.134-23.528V14.55H19.919v7.616h11.043zm-3.142-5.362c0-.018-.123-.34-.274-.716l-.274-.684.044-.788c.054-.962.055-2.729.002-3.335-.116-1.317-.328-2.156-.704-2.786-.216-.361-.467-.615-.707-.714a1.273 1.273 0 00-.892-.021c-.148.05-.41.255-.558.436-.455.555-.747 1.516-.889 2.928-.062.622-.076 2.057-.028 3.002.068 1.366.08 1.257-.191 1.921-.127.311-.25.615-.274.677l-.043.111h2.394c1.841 0 2.394-.007 2.394-.031z" />
                      <path
                        d="M27.119 34.531c.353-.213.76-.274 1.152-.332.331-.066.654-.012.976.073.281.075.541.217.804.347.414.184.829.368 1.244.55.462.204.949.326 1.437.425.392.073.789.09 1.185.075.375-.008.718-.16 1.051-.339.465-.245.888-.574 1.334-.856-1.613.949-.23.291.145-.12l-.833.376v0c-.64.512 2.435-1.645-.145.101l-.21.143c-.035.024-.14.093-.104.07.802-.505.822-.514.5-.327-.326.184-.657.358-1.03.373a5.25 5.25 0 01-1.179-.054c-.486-.09-.97-.207-1.43-.408-.412-.179-.821-.368-1.232-.552-.266-.133-.527-.284-.812-.363-.33-.089-.66-.165-1-.098-.392.055-.796.11-1.16.292l-.693.624zM14.294 35.119c.353-.213.76-.274 1.152-.332.331-.066.654-.012.976.073.281.075.541.217.804.347.414.184.829.368 1.244.55.462.204.949.326 1.437.425.392.073.789.09 1.185.075.375-.008.718-.16 1.051-.339.465-.245.888-.574 1.334-.856-1.613.949-.23.291.145-.12l-.833.376v0c-.64.512 2.435-1.645-.145.101l-.21.143c-.035.024-.14.093-.104.07.802-.505.822-.514.5-.327-.326.184-.657.358-1.03.373a5.25 5.25 0 01-1.179-.054c-.486-.09-.97-.207-1.43-.408-.412-.179-.821-.368-1.232-.552-.266-.133-.527-.284-.812-.363-.33-.089-.66-.165-1-.098-.392.055-.796.11-1.16.292l-.693.624z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.274"
                      />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No oil information</h2>
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

export default EveningOil;
