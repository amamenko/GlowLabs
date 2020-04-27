import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_EXFOLIATOR_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/Exfoliator/ProductName/ACTION_EXFOLIATOR_PRODUCT_NAME";
import ACTION_EXFOLIATOR_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/Exfoliator/ProductFrequency/ACTION_EXFOLIATOR_PRODUCT_FREQUENCY";
import ACTION_EXFOLIATOR_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/Exfoliator/ProductLink/ACTION_EXFOLIATOR_PRODUCT_LINK";
import ACTION_EXFOLIATOR_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/Exfoliator/ProductUseNotes/ACTION_EXFOLIATOR_PRODUCT_USE_NOTES";
import ACTION_RESET_ALL_EXFOLIATOR_FIELDS from "../../../../../../actions/MyRoutine/Evening/Exfoliator/ACTION_RESET_ALL_EXFOLIATOR_FIELDS";

const EveningExfoliator = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const exfoliatorProductFrequency = useSelector(
    (state) => state.exfoliatorProductFrequency.exfoliator_product_frequency
  );
  const exfoliatorProductLink = useSelector(
    (state) => state.exfoliatorProductLink.exfoliator_product_link
  );
  const exfoliatorProductName = useSelector(
    (state) => state.exfoliatorProductName.exfoliator_product_name
  );
  const exfoliatorProductUseNotes = useSelector(
    (state) => state.exfoliatorProductUseNotes.exfoliator_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_EXFOLIATOR_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(ACTION_EXFOLIATOR_PRODUCT_FREQUENCY(e.currentTarget.value.trim()));
  };

  const handleProductUsageDetails = (e) => {
    dispatch(ACTION_EXFOLIATOR_PRODUCT_USE_NOTES(e.currentTarget.value.trim()));
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_EXFOLIATOR_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_EXFOLIATOR_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_exfoliator")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg viewBox="0 0 50.006 50.006" height="3rem" width="100%">
          <path
            strokeWidth=".529"
            d="M18.764 47.511c-.827-.284-1.393-.792-1.773-1.592-.281-.591-.309-1.058-.297-5.06.007-2.425-.03-4.75-.083-5.168-.053-.418-.354-3.064-.67-5.88-.316-2.817-.722-6.413-.902-7.992-.18-1.579-.399-3.534-.487-4.345A2681.97 2681.97 0 0013.18 5.448c-.134-1.144-.162-1.967-.071-2.134.139-.254.879-.271 12.025-.271 11.145 0 11.887.017 12.029.271.097.174.039 1.276-.161 3.065a2188.57 2188.57 0 00-.805 7.371c-.27 2.518-.637 5.904-.813 7.526-.177 1.622-.548 5.043-.823 7.604-.276 2.56-.61 5.633-.741 6.828-.143 1.288-.24 3.745-.24 6.038 0 3.833-.004 3.871-.407 4.521-.223.36-.684.82-1.025 1.023-.618.366-.622.366-6.686.402-4.852.028-6.194-.008-6.698-.18zm11.118-.888c.912-.044 1.337-.14 1.68-.381.826-.58.865-.791.867-4.754l.003-3.686H17.837l.012 3.53c.015 4.158.083 4.457 1.138 4.966.584.282.994.35 2.131.35h1.408c3.495-.037 4.948.08 7.356-.025zm2.632-10.101c.04-.107.484-4 .986-8.651.502-4.652 1.28-11.827 1.726-15.945.447-4.118.813-7.558.813-7.643 0-.1-3.765-.154-10.905-.154-5.997 0-10.905.045-10.905.1 0 .055.702 6.287 1.56 13.85.859 7.562 1.675 14.762 1.815 16 .14 1.237.284 2.337.32 2.444.052.15 1.657.194 7.292.194 5.633 0 7.242-.043 7.298-.194zm-12.432-7.893c-.163-.09-.367-.34-.454-.557-.167-.414-1.46-11.363-1.499-12.677-.019-.672.04-.812.502-1.203l.523-.442h5.909c6.372 0 6.57.023 7.023.823.181.32.173.773-.05 2.767-.148 1.311-.452 4.025-.676 6.031-.52 4.66-.512 4.62-1.013 5.06-.417.365-.474.371-3.66.371-2.751 0-3.267-.037-3.45-.246-.157-.178-.169-.316-.044-.504.15-.224.59-.264 3.298-.3l3.125-.043.098-.578c.054-.318.169-1.242.255-2.053.19-1.782.768-6.87.986-8.683.118-.986.109-1.34-.039-1.426-.287-.168-11.15-.154-11.432.014-.231.139.02 2.943 1.015 11.29l.17 1.428.821.046c.932.053 1.322.385.95.81-.252.286-1.879.337-2.358.073zM15.92 8.685a.611.611 0 01.064-.504c.15-.224 1.075-.255 8.923-.293 4.815-.024 8.913-.007 9.106.037.393.09.588.431.446.782-.082.203-1.264.232-9.265.232-8.339 0-9.18-.023-9.274-.253zm.966-1.484c-.116-.11-.196-.642-.196-1.308 0-.958.044-1.136.305-1.214.69-.207.843.031.843 1.312 0 .959-.054 1.228-.26 1.302-.366.133-.468.12-.692-.092zm2.766-.104c-.245-.434-.218-1.922.041-2.257.119-.154.359-.253.533-.222.284.052.317.197.317 1.375 0 1.236-.022 1.32-.358 1.365a.51.51 0 01-.533-.261zm2.654.188c-.14-.053-.205-.467-.205-1.296 0-1.092.035-1.229.336-1.32.59-.177.812.18.812 1.31 0 1.24-.241 1.574-.943 1.306zm2.417-.211c-.098-.173-.156-.742-.129-1.264.051-.999.314-1.361.846-1.168.388.141.396 2.511.01 2.651-.416.151-.539.114-.727-.22zm2.66.181c-.153-.09-.2-.477-.165-1.353.042-1.07.09-1.234.366-1.284.475-.086.748.402.748 1.335 0 1.21-.336 1.67-.95 1.302zm2.458-.054c-.117-.11-.197-.642-.197-1.308 0-.958.045-1.136.305-1.214.677-.203.843.037.843 1.22 0 1.075-.16 1.489-.574 1.489-.099 0-.269-.084-.377-.187zm2.766-.104c-.245-.434-.218-1.922.04-2.257.12-.154.36-.253.534-.222.284.052.317.197.317 1.375 0 1.236-.022 1.32-.358 1.365a.51.51 0 01-.533-.261z"
            strokeOpacity="1"
            strokeMiterlimit="4"
            strokeDasharray="none"
          />
          <path
            strokeWidth="1.535"
            strokeLinejoin="round"
            strokeLinecap="round"
            fill="none"
            d="M21.828 28.31h2.778z"
            strokeMiterlimit="4"
            strokeDasharray="none"
          />
        </svg>
      </div>
      <h2>Exfoliator</h2>
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
          itemToggled === "evening_exfoliator" &&
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
                  <p>Exfoliator</p>
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
                        defaultValue={exfoliatorProductName}
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
                        defaultValue={exfoliatorProductFrequency}
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
                        defaultValue={exfoliatorProductUseNotes}
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
                        defaultValue={exfoliatorProductLink}
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
                        strokeWidth=".529"
                        d="M18.764 47.511c-.827-.284-1.393-.792-1.773-1.592-.281-.591-.309-1.058-.297-5.06.007-2.425-.03-4.75-.083-5.168-.053-.418-.354-3.064-.67-5.88-.316-2.817-.722-6.413-.902-7.992-.18-1.579-.399-3.534-.487-4.345A2681.97 2681.97 0 0013.18 5.448c-.134-1.144-.162-1.967-.071-2.134.139-.254.879-.271 12.025-.271 11.145 0 11.887.017 12.029.271.097.174.039 1.276-.161 3.065a2188.57 2188.57 0 00-.805 7.371c-.27 2.518-.637 5.904-.813 7.526-.177 1.622-.548 5.043-.823 7.604-.276 2.56-.61 5.633-.741 6.828-.143 1.288-.24 3.745-.24 6.038 0 3.833-.004 3.871-.407 4.521-.223.36-.684.82-1.025 1.023-.618.366-.622.366-6.686.402-4.852.028-6.194-.008-6.698-.18zm11.118-.888c.912-.044 1.337-.14 1.68-.381.826-.58.865-.791.867-4.754l.003-3.686H17.837l.012 3.53c.015 4.158.083 4.457 1.138 4.966.584.282.994.35 2.131.35h1.408c3.495-.037 4.948.08 7.356-.025zm2.632-10.101c.04-.107.484-4 .986-8.651.502-4.652 1.28-11.827 1.726-15.945.447-4.118.813-7.558.813-7.643 0-.1-3.765-.154-10.905-.154-5.997 0-10.905.045-10.905.1 0 .055.702 6.287 1.56 13.85.859 7.562 1.675 14.762 1.815 16 .14 1.237.284 2.337.32 2.444.052.15 1.657.194 7.292.194 5.633 0 7.242-.043 7.298-.194zm-12.432-7.893c-.163-.09-.367-.34-.454-.557-.167-.414-1.46-11.363-1.499-12.677-.019-.672.04-.812.502-1.203l.523-.442h5.909c6.372 0 6.57.023 7.023.823.181.32.173.773-.05 2.767-.148 1.311-.452 4.025-.676 6.031-.52 4.66-.512 4.62-1.013 5.06-.417.365-.474.371-3.66.371-2.751 0-3.267-.037-3.45-.246-.157-.178-.169-.316-.044-.504.15-.224.59-.264 3.298-.3l3.125-.043.098-.578c.054-.318.169-1.242.255-2.053.19-1.782.768-6.87.986-8.683.118-.986.109-1.34-.039-1.426-.287-.168-11.15-.154-11.432.014-.231.139.02 2.943 1.015 11.29l.17 1.428.821.046c.932.053 1.322.385.95.81-.252.286-1.879.337-2.358.073zM15.92 8.685a.611.611 0 01.064-.504c.15-.224 1.075-.255 8.923-.293 4.815-.024 8.913-.007 9.106.037.393.09.588.431.446.782-.082.203-1.264.232-9.265.232-8.339 0-9.18-.023-9.274-.253zm.966-1.484c-.116-.11-.196-.642-.196-1.308 0-.958.044-1.136.305-1.214.69-.207.843.031.843 1.312 0 .959-.054 1.228-.26 1.302-.366.133-.468.12-.692-.092zm2.766-.104c-.245-.434-.218-1.922.041-2.257.119-.154.359-.253.533-.222.284.052.317.197.317 1.375 0 1.236-.022 1.32-.358 1.365a.51.51 0 01-.533-.261zm2.654.188c-.14-.053-.205-.467-.205-1.296 0-1.092.035-1.229.336-1.32.59-.177.812.18.812 1.31 0 1.24-.241 1.574-.943 1.306zm2.417-.211c-.098-.173-.156-.742-.129-1.264.051-.999.314-1.361.846-1.168.388.141.396 2.511.01 2.651-.416.151-.539.114-.727-.22zm2.66.181c-.153-.09-.2-.477-.165-1.353.042-1.07.09-1.234.366-1.284.475-.086.748.402.748 1.335 0 1.21-.336 1.67-.95 1.302zm2.458-.054c-.117-.11-.197-.642-.197-1.308 0-.958.045-1.136.305-1.214.677-.203.843.037.843 1.22 0 1.075-.16 1.489-.574 1.489-.099 0-.269-.084-.377-.187zm2.766-.104c-.245-.434-.218-1.922.04-2.257.12-.154.36-.253.534-.222.284.052.317.197.317 1.375 0 1.236-.022 1.32-.358 1.365a.51.51 0 01-.533-.261z"
                        strokeOpacity="1"
                        strokeMiterlimit="4"
                        strokeDasharray="none"
                      />
                      <path
                        strokeWidth="1.535"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        fill="none"
                        d="M21.828 28.31h2.778z"
                        strokeMiterlimit="4"
                        strokeDasharray="none"
                      />
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No exfoliator information</h2>
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

export default EveningExfoliator;
