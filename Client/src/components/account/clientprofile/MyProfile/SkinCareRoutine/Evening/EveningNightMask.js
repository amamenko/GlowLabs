import React, { useEffect } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import ACTION_NIGHT_MASK_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Evening/NightMask/ProductName/ACTION_NIGHT_MASK_PRODUCT_NAME";
import ACTION_NIGHT_MASK_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Evening/NightMask/ProductFrequency/ACTION_NIGHT_MASK_PRODUCT_FREQUENCY";
import ACTION_NIGHT_MASK_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Evening/NightMask/ProductLink/ACTION_NIGHT_MASK_PRODUCT_LINK";
import ACTION_NIGHT_MASK_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Evening/NightMask/ProductUseNotes/ACTION_NIGHT_MASK_PRODUCT_USE_NOTES";
import ACTION_RESET_ALL_NIGHT_MASK_FIELDS from "../../../../../../actions/MyRoutine/Evening/NightMask/ACTION_RESET_ALL_NIGHT_MASK_FIELDS";

const EveningNightMask = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const nightMaskProductFrequency = useSelector(
    (state) => state.nightMaskProductFrequency.night_mask_product_frequency
  );
  const nightMaskProductLink = useSelector(
    (state) => state.nightMaskProductLink.night_mask_product_link
  );
  const nightMaskProductName = useSelector(
    (state) => state.nightMaskProductName.night_mask_product_name
  );
  const nightMaskProductUseNotes = useSelector(
    (state) => state.nightMaskProductUseNotes.night_mask_product_use_notes
  );

  const handleProductName = (e) => {
    dispatch(ACTION_NIGHT_MASK_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(ACTION_NIGHT_MASK_PRODUCT_FREQUENCY(e.currentTarget.value.trim()));
  };

  const handleProductUsageDetails = (e) => {
    dispatch(ACTION_NIGHT_MASK_PRODUCT_USE_NOTES(e.currentTarget.value.trim()));
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_NIGHT_MASK_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_NIGHT_MASK_FIELDS());
    };
  }, [dispatch]);

  return (
    <div
      className="skin_care_routine_evening_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "evening_night_mask")}
      ref={props.individualItemEveningRef}
    >
      <div className="skin_care_routine_icon_container">
        <svg viewBox="0 0 50.006 50.006" height="3rem" width="100%">
          <g
            stroke="#000"
            strokeOpacity="1"
            strokeWidth=".794"
            strokeMiterlimit="4"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5.349 46.471a1.355 1.355 0 01-.41-.184c-.377-.244-.643-.67-.75-1.202-.065-.328-.064-6.25.002-6.58.13-.654.573-1.21 1.072-1.345l.159-.043v-.746c0-.927 0-.927.267-.953l.193-.019.12-.314c.23-.603.688-1.06 1.202-1.2.258-.071.352-.07.792.003l.36.061.235-.153c.274-.177.537-.47.672-.746.092-.187.185-.506.247-.843.041-.225.104-.25.457-.18.788.156 1.33.6 1.62 1.33.115.29.214.69.253 1.021l.018.153.215.044c.348.073.632.305.83.68l.085.163h.21c.125 0 .225.019.245.045.025.033.035.275.035.85v.802l.123.026c.068.015.2.067.296.116.095.05.175.086.18.08a.903.903 0 00-.05-.173c-.08-.23-.073-.332.024-.397.246-.167.995-.53 1.162-.563.554-.112 1.194.32 1.446.977.143.372 2.088 6.537 2.12 6.72.102.578-.027 1.215-.336 1.664-.19.277-.35.4-.901.697-.357.191-.484.244-.523.217-.033-.023-.43-1.232-1.104-3.362a401.367 401.367 0 00-1.092-3.42c-.033-.08-.039.317-.04 2.538 0 2.24-.008 2.667-.045 2.856-.142.71-.63 1.278-1.188 1.382-.25.047-7.949.045-8.2-.002zm8.428-.445c.237-.125.508-.464.617-.771l.084-.238v-6.439l-.095-.251c-.12-.319-.372-.633-.607-.757l-.168-.088-4.069-.01c-4.432-.011-4.255-.02-4.539.198-.296.227-.513.654-.563 1.108-.04.354-.039 5.749 0 6.065.075.6.399 1.075.84 1.23.137.05.716.056 4.245.05l4.086-.008.169-.089zm3.828-.198c.454-.244.654-.458.806-.86.082-.217.096-.299.105-.594.008-.29-.001-.378-.062-.588-.192-.664-2.036-6.432-2.093-6.549-.222-.45-.642-.717-1.058-.672-.14.015-.298.08-.602.242-.226.121-.407.237-.4.258.145.468 2.837 8.943 2.848 8.966.008.018.03.025.048.016l.408-.219zm-4.395-9.397l-.008-.653H5.727l-.008.653-.008.653h7.508zm-.605-1.079c-.104-.17-.337-.358-.504-.403-.2-.054-4.443-.743-4.577-.743-.192 0-.494.111-.672.247-.21.16-.456.484-.56.74l-.092.225h3.222c3.055 0 3.22-.004 3.183-.066zm-1.073-1.06c-.068-.483-.231-.925-.451-1.227-.243-.332-.687-.59-1.188-.69l-.122-.025-.031.161c-.102.526-.331.987-.646 1.298a1.689 1.689 0 00-.193.21c-.002.017 2.427.437 2.595.448.058.004.06-.006.036-.176z" />
            <path d="M8.954 44.182c-.486-.066-.93-.402-1.245-.94-.131-.223-.286-.61-.293-.729-.005-.07.017-.125.06-.156.04-.028.065-.026.129.01.453.261.968.212 1.387-.13.14-.116.232-.218.357-.399.252-.365.403-.803.455-1.319a4.42 4.42 0 00.006-.59 3.535 3.535 0 00-.1-.58.832.832 0 01-.027-.131c0-.044.023-.107.05-.133a.077.077 0 01.056-.026c.03-.003.04 0 .09.033.226.144.466.4.63.674.243.402.387.864.443 1.418.015.148.014.553-.003.707-.066.63-.261 1.17-.575 1.59-.281.375-.628.612-1.015.69a2.127 2.127 0 01-.405.01zm.394-.344c.295-.067.559-.232.784-.492.063-.072.202-.275.253-.368a2.98 2.98 0 00.342-1.192 4.595 4.595 0 00-.006-.594 3.05 3.05 0 00-.153-.705 2.299 2.299 0 00-.516-.872.766.766 0 00-.053-.05 3.733 3.733 0 01.029.234c.067.65-.03 1.3-.279 1.857-.01.023-.043.09-.072.146-.3.578-.76.962-1.257 1.045-.199.034-.42.019-.607-.042a.15.15 0 00-.048-.011c0 .009.08.166.118.23.148.255.322.451.526.596.17.12.358.2.545.229.073.011.326.004.395-.011z" />
            <path d="M29.789 46.613c-2.133-.252-4.439-1.217-6.428-2.692-.955-.709-2.609-2.354-3.46-3.442-2.313-2.962-3.932-6.732-4.663-10.863-.23-1.3-.24-1.505-.238-4.462.002-3.362.098-4.402.632-6.877 1.602-7.428 5.964-12.36 12.058-13.636 2.168-.454 4.751-.442 6.943.033 5.915 1.28 10.135 5.965 11.822 13.126.663 2.811.972 6.403.788 9.14-.346 5.137-2.048 9.803-4.934 13.524-.828 1.067-2.592 2.803-3.6 3.542-2.744 2.01-5.976 2.955-8.92 2.607zm3.386-1.188c1.714-.355 3.481-1.157 4.991-2.263 1.078-.79 2.934-2.693 3.793-3.887 2.543-3.538 4.046-7.94 4.273-12.51a34.567 34.567 0 00-.263-5.884c-1.158-8.313-5.21-13.727-11.34-15.158-2.08-.485-4.837-.487-7.03-.004-2.666.587-5.251 2.162-7.005 4.266-2.903 3.484-4.487 8.46-4.624 14.521-.07 3.077.154 5.072.852 7.599 1.394 5.048 4.654 9.657 8.356 11.813 2.624 1.528 5.385 2.048 7.996 1.507zm-3.945-5.75c-1.369-.382-3.063-1.5-3.45-2.276-.208-.415-.167-.963.097-1.287.33-.407 1.796-1.476 2.557-1.866.849-.434 1.693-.522 2.308-.24.398.182.416.182.719.015.387-.213 1.187-.23 1.728-.037.64.228 1.06.479 2.129 1.263 1.569 1.153 1.675 1.64.596 2.728a6.282 6.282 0 01-2.51 1.568c-.633.216-.905.252-2.131.279-1.162.025-1.517 0-2.043-.147zm3.452-.996c1.143-.298 3.103-1.583 2.91-1.907-.098-.164-1.762-1.372-2.217-1.609-.617-.322-1.179-.352-1.777-.095l-.507.217-.504-.216c-.618-.265-1.074-.232-1.763.126-.66.344-2.177 1.466-2.177 1.612 0 .184.876.953 1.497 1.312.836.485 1.706.69 2.95.696.648.003 1.254-.049 1.588-.136zm-2.472-7.88c-.494-.166-1.102-.539-1.375-.84-.265-.295-.207-.674.128-.832.196-.093.284-.064.7.233.62.44.886.538 1.457.535.506-.002 1.054-.216 1.545-.604.36-.284.523-.299.725-.067.35.4.01.907-.933 1.387-.606.309-1.635.395-2.247.189zm-7.146-2.465c-1.424-.312-2.731-1.282-3.272-2.429-.23-.488-.265-.67-.265-1.362 0-.698.035-.875.281-1.413.51-1.114 1.66-2.022 3.03-2.393.703-.19 2.036-.213 2.73-.045 1.408.34 2.642 1.281 3.19 2.434.256.538.292.71.292 1.369 0 .654-.038.837-.292 1.393-.873 1.907-3.331 2.963-5.694 2.446zm2.229-1.013c.797-.175 1.357-.46 1.905-.97.645-.601.849-1.044.852-1.854.003-.766-.233-1.282-.85-1.86-1.217-1.138-3.507-1.371-5.117-.52-.492.26-1.131.892-1.35 1.335-1.1 2.233 1.595 4.52 4.56 3.87zm11.83 1.108c-1.07-.171-2.145-.7-2.86-1.406-2.595-2.564-.38-6.449 3.676-6.449 1.946 0 3.695.97 4.453 2.468.237.467.262.603.262 1.454.001.808-.03 1.005-.22 1.41-.474.999-1.66 1.953-2.908 2.34-.505.156-1.905.263-2.403.183zm1.799-1.113c1.731-.38 2.784-1.446 2.78-2.814-.002-.353-.068-.717-.174-.96-.354-.807-1.352-1.549-2.441-1.815-.592-.144-1.716-.146-2.323-.004-1.033.243-1.992.948-2.365 1.738-1.075 2.275 1.545 4.508 4.523 3.855z" />
          </g>
        </svg>
      </div>
      <h2>Night Mask</h2>
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
          itemToggled === "evening_night_mask" &&
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
                  <p>Night Mask</p>
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
                        defaultValue={nightMaskProductName}
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
                        defaultValue={nightMaskProductFrequency}
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
                        defaultValue={nightMaskProductUseNotes}
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
                        defaultValue={nightMaskProductLink}
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
                      <g
                        strokeOpacity="1"
                        strokeWidth=".794"
                        strokeMiterlimit="4"
                        strokeDasharray="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5.349 46.471a1.355 1.355 0 01-.41-.184c-.377-.244-.643-.67-.75-1.202-.065-.328-.064-6.25.002-6.58.13-.654.573-1.21 1.072-1.345l.159-.043v-.746c0-.927 0-.927.267-.953l.193-.019.12-.314c.23-.603.688-1.06 1.202-1.2.258-.071.352-.07.792.003l.36.061.235-.153c.274-.177.537-.47.672-.746.092-.187.185-.506.247-.843.041-.225.104-.25.457-.18.788.156 1.33.6 1.62 1.33.115.29.214.69.253 1.021l.018.153.215.044c.348.073.632.305.83.68l.085.163h.21c.125 0 .225.019.245.045.025.033.035.275.035.85v.802l.123.026c.068.015.2.067.296.116.095.05.175.086.18.08a.903.903 0 00-.05-.173c-.08-.23-.073-.332.024-.397.246-.167.995-.53 1.162-.563.554-.112 1.194.32 1.446.977.143.372 2.088 6.537 2.12 6.72.102.578-.027 1.215-.336 1.664-.19.277-.35.4-.901.697-.357.191-.484.244-.523.217-.033-.023-.43-1.232-1.104-3.362a401.367 401.367 0 00-1.092-3.42c-.033-.08-.039.317-.04 2.538 0 2.24-.008 2.667-.045 2.856-.142.71-.63 1.278-1.188 1.382-.25.047-7.949.045-8.2-.002zm8.428-.445c.237-.125.508-.464.617-.771l.084-.238v-6.439l-.095-.251c-.12-.319-.372-.633-.607-.757l-.168-.088-4.069-.01c-4.432-.011-4.255-.02-4.539.198-.296.227-.513.654-.563 1.108-.04.354-.039 5.749 0 6.065.075.6.399 1.075.84 1.23.137.05.716.056 4.245.05l4.086-.008.169-.089zm3.828-.198c.454-.244.654-.458.806-.86.082-.217.096-.299.105-.594.008-.29-.001-.378-.062-.588-.192-.664-2.036-6.432-2.093-6.549-.222-.45-.642-.717-1.058-.672-.14.015-.298.08-.602.242-.226.121-.407.237-.4.258.145.468 2.837 8.943 2.848 8.966.008.018.03.025.048.016l.408-.219zm-4.395-9.397l-.008-.653H5.727l-.008.653-.008.653h7.508zm-.605-1.079c-.104-.17-.337-.358-.504-.403-.2-.054-4.443-.743-4.577-.743-.192 0-.494.111-.672.247-.21.16-.456.484-.56.74l-.092.225h3.222c3.055 0 3.22-.004 3.183-.066zm-1.073-1.06c-.068-.483-.231-.925-.451-1.227-.243-.332-.687-.59-1.188-.69l-.122-.025-.031.161c-.102.526-.331.987-.646 1.298a1.689 1.689 0 00-.193.21c-.002.017 2.427.437 2.595.448.058.004.06-.006.036-.176z" />
                        <path d="M8.954 44.182c-.486-.066-.93-.402-1.245-.94-.131-.223-.286-.61-.293-.729-.005-.07.017-.125.06-.156.04-.028.065-.026.129.01.453.261.968.212 1.387-.13.14-.116.232-.218.357-.399.252-.365.403-.803.455-1.319a4.42 4.42 0 00.006-.59 3.535 3.535 0 00-.1-.58.832.832 0 01-.027-.131c0-.044.023-.107.05-.133a.077.077 0 01.056-.026c.03-.003.04 0 .09.033.226.144.466.4.63.674.243.402.387.864.443 1.418.015.148.014.553-.003.707-.066.63-.261 1.17-.575 1.59-.281.375-.628.612-1.015.69a2.127 2.127 0 01-.405.01zm.394-.344c.295-.067.559-.232.784-.492.063-.072.202-.275.253-.368a2.98 2.98 0 00.342-1.192 4.595 4.595 0 00-.006-.594 3.05 3.05 0 00-.153-.705 2.299 2.299 0 00-.516-.872.766.766 0 00-.053-.05 3.733 3.733 0 01.029.234c.067.65-.03 1.3-.279 1.857-.01.023-.043.09-.072.146-.3.578-.76.962-1.257 1.045-.199.034-.42.019-.607-.042a.15.15 0 00-.048-.011c0 .009.08.166.118.23.148.255.322.451.526.596.17.12.358.2.545.229.073.011.326.004.395-.011z" />
                        <path d="M29.789 46.613c-2.133-.252-4.439-1.217-6.428-2.692-.955-.709-2.609-2.354-3.46-3.442-2.313-2.962-3.932-6.732-4.663-10.863-.23-1.3-.24-1.505-.238-4.462.002-3.362.098-4.402.632-6.877 1.602-7.428 5.964-12.36 12.058-13.636 2.168-.454 4.751-.442 6.943.033 5.915 1.28 10.135 5.965 11.822 13.126.663 2.811.972 6.403.788 9.14-.346 5.137-2.048 9.803-4.934 13.524-.828 1.067-2.592 2.803-3.6 3.542-2.744 2.01-5.976 2.955-8.92 2.607zm3.386-1.188c1.714-.355 3.481-1.157 4.991-2.263 1.078-.79 2.934-2.693 3.793-3.887 2.543-3.538 4.046-7.94 4.273-12.51a34.567 34.567 0 00-.263-5.884c-1.158-8.313-5.21-13.727-11.34-15.158-2.08-.485-4.837-.487-7.03-.004-2.666.587-5.251 2.162-7.005 4.266-2.903 3.484-4.487 8.46-4.624 14.521-.07 3.077.154 5.072.852 7.599 1.394 5.048 4.654 9.657 8.356 11.813 2.624 1.528 5.385 2.048 7.996 1.507zm-3.945-5.75c-1.369-.382-3.063-1.5-3.45-2.276-.208-.415-.167-.963.097-1.287.33-.407 1.796-1.476 2.557-1.866.849-.434 1.693-.522 2.308-.24.398.182.416.182.719.015.387-.213 1.187-.23 1.728-.037.64.228 1.06.479 2.129 1.263 1.569 1.153 1.675 1.64.596 2.728a6.282 6.282 0 01-2.51 1.568c-.633.216-.905.252-2.131.279-1.162.025-1.517 0-2.043-.147zm3.452-.996c1.143-.298 3.103-1.583 2.91-1.907-.098-.164-1.762-1.372-2.217-1.609-.617-.322-1.179-.352-1.777-.095l-.507.217-.504-.216c-.618-.265-1.074-.232-1.763.126-.66.344-2.177 1.466-2.177 1.612 0 .184.876.953 1.497 1.312.836.485 1.706.69 2.95.696.648.003 1.254-.049 1.588-.136zm-2.472-7.88c-.494-.166-1.102-.539-1.375-.84-.265-.295-.207-.674.128-.832.196-.093.284-.064.7.233.62.44.886.538 1.457.535.506-.002 1.054-.216 1.545-.604.36-.284.523-.299.725-.067.35.4.01.907-.933 1.387-.606.309-1.635.395-2.247.189zm-7.146-2.465c-1.424-.312-2.731-1.282-3.272-2.429-.23-.488-.265-.67-.265-1.362 0-.698.035-.875.281-1.413.51-1.114 1.66-2.022 3.03-2.393.703-.19 2.036-.213 2.73-.045 1.408.34 2.642 1.281 3.19 2.434.256.538.292.71.292 1.369 0 .654-.038.837-.292 1.393-.873 1.907-3.331 2.963-5.694 2.446zm2.229-1.013c.797-.175 1.357-.46 1.905-.97.645-.601.849-1.044.852-1.854.003-.766-.233-1.282-.85-1.86-1.217-1.138-3.507-1.371-5.117-.52-.492.26-1.131.892-1.35 1.335-1.1 2.233 1.595 4.52 4.56 3.87zm11.83 1.108c-1.07-.171-2.145-.7-2.86-1.406-2.595-2.564-.38-6.449 3.676-6.449 1.946 0 3.695.97 4.453 2.468.237.467.262.603.262 1.454.001.808-.03 1.005-.22 1.41-.474.999-1.66 1.953-2.908 2.34-.505.156-1.905.263-2.403.183zm1.799-1.113c1.731-.38 2.784-1.446 2.78-2.814-.002-.353-.068-.717-.174-.96-.354-.807-1.352-1.549-2.441-1.815-.592-.144-1.716-.146-2.323-.004-1.033.243-1.992.948-2.365 1.738-1.075 2.275 1.545 4.508 4.523 3.855z" />
                      </g>
                    </svg>
                  </div>
                  <div className="my_individual_selected_item_empty_state_text_container">
                    <h2>No night mask information</h2>
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

export default EveningNightMask;
