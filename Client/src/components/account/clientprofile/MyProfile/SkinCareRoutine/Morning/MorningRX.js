import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_MORNING_RX_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/RX/ProductName/ACTION_MORNING_RX_PRODUCT_NAME";
import ACTION_MORNING_RX_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/RX/ProductFrequency/ACTION_MORNING_RX_PRODUCT_FREQUENCY";
import ACTION_MORNING_RX_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/RX/ProductUseNotes/ACTION_MORNING_RX_PRODUCT_USE_NOTES";
import ACTION_MORNING_RX_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/RX/ProductLink/ACTION_MORNING_RX_PRODUCT_LINK";
import ACTION_RESET_ALL_MORNING_RX_FIELDS from "../../../../../../actions/MyRoutine/Morning/RX/ACTION_RESET_ALL_MORNING_RX_FIELDS";

const MorningRX = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const morningRXProductFrequency = useSelector(
    (state) => state.morningRXProductFrequency.morning_rx_product_frequency
  );
  const morningRXProductLink = useSelector(
    (state) => state.morningRXProductLink.morning_rx_product_link
  );
  const morningRXProductName = useSelector(
    (state) => state.morningRXProductName.morning_rx_product_name
  );
  const morningRXProductUseNotes = useSelector(
    (state) => state.morningRXProductUseNotes.morning_rx_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_MORNING_RX_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(ACTION_MORNING_RX_PRODUCT_FREQUENCY(e.currentTarget.value.trim()));
  };

  const handleProductUsageDetails = (e) => {
    dispatch(ACTION_MORNING_RX_PRODUCT_USE_NOTES(e.currentTarget.value.trim()));
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_MORNING_RX_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_MORNING_RX_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_morning_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "morning_prescriptions")}
      ref={props.individualItemMorningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <g fill="#000">
            <path
              d="M11.496 40.267c-6.425-6.7-7.395-7.745-7.395-7.969 0-.213.214-.484 1.25-1.576C6.71 29.289 31.355 6.363 31.675 6.235c.14-.056 1.02.092 3.096.521l2.902.6.542-.56.541-.559-.293-.338c-.52-.601-.466-.742.795-2.043.89-.919 1.133-1.122 1.334-1.122.21 0 .723.497 3.573 3.47 2.85 2.971 3.328 3.506 3.328 3.725 0 .21-.195.462-1.077 1.39-1.247 1.315-1.382 1.373-1.959.83l-.324-.306-.543.572-.543.57.582 3.05c.403 2.11.56 3.103.507 3.221-.154.348-22.261 26.157-23.485 27.418-1.048 1.08-1.308 1.303-1.513 1.303-.215 0-1.217-1.01-7.642-7.71zm20.293-8.45l10.892-12.76-5.42-5.652-5.422-5.652L30.28 9.2 18.34 20.27C12.63 25.561 7.431 30.43 6.79 31.09l-1.167 1.198 6.76 7.049 6.76 7.049.876-.906c.483-.497 5.779-6.646 11.77-13.664zm-17.623 5.666c-4.524-4.716-5.573-5.854-5.573-6.041 0-.357.302-.696.62-.696.244 0 .805.558 5.842 5.81 5.033 5.248 5.572 5.838 5.572 6.091 0 .332-.325.647-.667.647-.18 0-1.27-1.094-5.794-5.81zm27.983-22.48l-.357-1.886-2.11-2.213-2.11-2.212-1.671-.344c-.92-.19-1.767-.361-1.883-.382-.15-.027 1.043 1.273 4.106 4.475 2.376 2.482 4.333 4.498 4.35 4.48.017-.017-.13-.88-.325-1.918zm-.692-5.97l-1.8-1.879-.448.461-.448.461 1.8 1.879 1.801 1.878.448-.46.448-.462zm4.068 1.364l.443-.467-.448-.461-.448-.462-.46.486-.46.486.417.442c.23.244.44.442.466.442.026 0 .247-.21.49-.466zM43.697 8.59c.223-.229.406-.457.406-.506 0-.12-1.624-1.817-1.74-1.817-.048 0-.277.2-.507.443l-.418.443.886.927c.487.51.904.927.927.927.023 0 .223-.188.446-.417zm-2.663-2.878l.442-.467-.448-.46-.448-.462-.46.486-.46.486.417.442c.23.243.44.442.466.442.027 0 .248-.21.49-.467z"
              strokeWidth=".087"
            />
            <path
              d="M25.204 30.459c-.136-.036-.208-.122-.22-.264a.357.357 0 01.018-.166c.026-.044.503-.638 1.192-1.483.179-.219.325-.403.325-.409 0-.006-.052-.08-.116-.167-.222-.3-.611-1.034-1.05-1.983a2.814 2.814 0 00-.718-.91 1.794 1.794 0 00-.535-.281c-.094-.025-.23-.033-.561-.033H23.1l.007 1.678.006 1.677.052.138c.082.223.163.288.395.316a.376.376 0 01.17.062c.06.046.062.056.062.244 0 .166-.007.202-.046.242-.1.103-.096.102-1.557.102h-1.367l-.082-.082c-.071-.073-.081-.096-.081-.19 0-.218.143-.365.425-.437.134-.034.134-.035.182-.155l.049-.12v-3.693c0-2.212-.01-3.805-.023-3.972-.027-.345-.062-.527-.11-.575a.906.906 0 00-.238-.094c-.32-.092-.417-.208-.355-.42a.338.338 0 01.256-.242c.1-.027.391-.031 2.089-.031 2.012 0 2.252.007 2.645.081.252.048.619.154.769.223.362.165.705.427.949.723.237.288.313.463.409.944.05.253.07.845.034 1.064-.088.552-.383 1.062-.876 1.518-.217.2-.6.49-.751.57l-.086.045.248.27c.507.55.994 1.244 1.287 1.832.078.157.147.285.154.284.006 0 .093-.105.192-.232.407-.523 1.037-1.277 1.192-1.427l.166-.16.249-.029c.384-.044.387-.043.5.06.098.089.1.093.1.229v.138l-.889 1.083c-.488.595-.89 1.09-.893 1.098-.012.034.463.251.696.317.146.042.216.049.509.049.292 0 .362-.007.508-.049.483-.138 1.016-.494 1.469-.981.13-.14.18-.18.241-.19.147-.025.216.003.343.138.111.117.12.133.12.234 0 .1-.015.128-.17.35a6.154 6.154 0 01-.87 1.005c-.419.383-.77.603-1.166.733-.382.124-.5.137-1.204.128-.608-.008-.636-.01-.83-.065a2.44 2.44 0 01-.63-.273.626.626 0 00-.126-.07.376.376 0 00-.095.098c-.695.894-1.203 1.445-1.379 1.493-.115.031-.45.041-.546.017zm-.881-6.698c.503-.086.903-.29 1.18-.603.263-.299.364-.51.43-.907.075-.46.027-.788-.171-1.152a1.43 1.43 0 00-.542-.556c-.44-.268-.75-.335-1.637-.356l-.526-.012v1.806c0 .993.005 1.81.01 1.814.005.005.247.006.537.004.365-.004.586-.015.719-.038z"
              strokeWidth=".022"
              strokeMiterlimit="4"
              strokeDasharray="none"
            />
          </g>
        </svg>
      </div>
      <h2>Prescriptions</h2>
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
          itemToggled === "morning_prescriptions" &&
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
                  <p>Prescriptions (AM)</p>
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
                        defaultValue={morningRXProductName}
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
                        defaultValue={morningRXProductFrequency}
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
                        defaultValue={morningRXProductUseNotes}
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
                        defaultValue={morningRXProductLink}
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
                      <g>
                        <path
                          d="M11.496 40.267c-6.425-6.7-7.395-7.745-7.395-7.969 0-.213.214-.484 1.25-1.576C6.71 29.289 31.355 6.363 31.675 6.235c.14-.056 1.02.092 3.096.521l2.902.6.542-.56.541-.559-.293-.338c-.52-.601-.466-.742.795-2.043.89-.919 1.133-1.122 1.334-1.122.21 0 .723.497 3.573 3.47 2.85 2.971 3.328 3.506 3.328 3.725 0 .21-.195.462-1.077 1.39-1.247 1.315-1.382 1.373-1.959.83l-.324-.306-.543.572-.543.57.582 3.05c.403 2.11.56 3.103.507 3.221-.154.348-22.261 26.157-23.485 27.418-1.048 1.08-1.308 1.303-1.513 1.303-.215 0-1.217-1.01-7.642-7.71zm20.293-8.45l10.892-12.76-5.42-5.652-5.422-5.652L30.28 9.2 18.34 20.27C12.63 25.561 7.431 30.43 6.79 31.09l-1.167 1.198 6.76 7.049 6.76 7.049.876-.906c.483-.497 5.779-6.646 11.77-13.664zm-17.623 5.666c-4.524-4.716-5.573-5.854-5.573-6.041 0-.357.302-.696.62-.696.244 0 .805.558 5.842 5.81 5.033 5.248 5.572 5.838 5.572 6.091 0 .332-.325.647-.667.647-.18 0-1.27-1.094-5.794-5.81zm27.983-22.48l-.357-1.886-2.11-2.213-2.11-2.212-1.671-.344c-.92-.19-1.767-.361-1.883-.382-.15-.027 1.043 1.273 4.106 4.475 2.376 2.482 4.333 4.498 4.35 4.48.017-.017-.13-.88-.325-1.918zm-.692-5.97l-1.8-1.879-.448.461-.448.461 1.8 1.879 1.801 1.878.448-.46.448-.462zm4.068 1.364l.443-.467-.448-.461-.448-.462-.46.486-.46.486.417.442c.23.244.44.442.466.442.026 0 .247-.21.49-.466zM43.697 8.59c.223-.229.406-.457.406-.506 0-.12-1.624-1.817-1.74-1.817-.048 0-.277.2-.507.443l-.418.443.886.927c.487.51.904.927.927.927.023 0 .223-.188.446-.417zm-2.663-2.878l.442-.467-.448-.46-.448-.462-.46.486-.46.486.417.442c.23.243.44.442.466.442.027 0 .248-.21.49-.467z"
                          strokeWidth=".087"
                        />
                        <path
                          d="M25.204 30.459c-.136-.036-.208-.122-.22-.264a.357.357 0 01.018-.166c.026-.044.503-.638 1.192-1.483.179-.219.325-.403.325-.409 0-.006-.052-.08-.116-.167-.222-.3-.611-1.034-1.05-1.983a2.814 2.814 0 00-.718-.91 1.794 1.794 0 00-.535-.281c-.094-.025-.23-.033-.561-.033H23.1l.007 1.678.006 1.677.052.138c.082.223.163.288.395.316a.376.376 0 01.17.062c.06.046.062.056.062.244 0 .166-.007.202-.046.242-.1.103-.096.102-1.557.102h-1.367l-.082-.082c-.071-.073-.081-.096-.081-.19 0-.218.143-.365.425-.437.134-.034.134-.035.182-.155l.049-.12v-3.693c0-2.212-.01-3.805-.023-3.972-.027-.345-.062-.527-.11-.575a.906.906 0 00-.238-.094c-.32-.092-.417-.208-.355-.42a.338.338 0 01.256-.242c.1-.027.391-.031 2.089-.031 2.012 0 2.252.007 2.645.081.252.048.619.154.769.223.362.165.705.427.949.723.237.288.313.463.409.944.05.253.07.845.034 1.064-.088.552-.383 1.062-.876 1.518-.217.2-.6.49-.751.57l-.086.045.248.27c.507.55.994 1.244 1.287 1.832.078.157.147.285.154.284.006 0 .093-.105.192-.232.407-.523 1.037-1.277 1.192-1.427l.166-.16.249-.029c.384-.044.387-.043.5.06.098.089.1.093.1.229v.138l-.889 1.083c-.488.595-.89 1.09-.893 1.098-.012.034.463.251.696.317.146.042.216.049.509.049.292 0 .362-.007.508-.049.483-.138 1.016-.494 1.469-.981.13-.14.18-.18.241-.19.147-.025.216.003.343.138.111.117.12.133.12.234 0 .1-.015.128-.17.35a6.154 6.154 0 01-.87 1.005c-.419.383-.77.603-1.166.733-.382.124-.5.137-1.204.128-.608-.008-.636-.01-.83-.065a2.44 2.44 0 01-.63-.273.626.626 0 00-.126-.07.376.376 0 00-.095.098c-.695.894-1.203 1.445-1.379 1.493-.115.031-.45.041-.546.017zm-.881-6.698c.503-.086.903-.29 1.18-.603.263-.299.364-.51.43-.907.075-.46.027-.788-.171-1.152a1.43 1.43 0 00-.542-.556c-.44-.268-.75-.335-1.637-.356l-.526-.012v1.806c0 .993.005 1.81.01 1.814.005.005.247.006.537.004.365-.004.586-.015.719-.038z"
                          strokeWidth=".022"
                          strokeMiterlimit="4"
                          strokeDasharray="none"
                        />
                      </g>
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>
                      No morning prescription creams & medications information
                    </h2>
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

export default MorningRX;
