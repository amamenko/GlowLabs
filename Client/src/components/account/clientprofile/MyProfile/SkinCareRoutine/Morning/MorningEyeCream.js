import React, { useEffect, useState } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input, Collapse, Modal } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
  faExternalLinkAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import deleteMyRoutineItemMutation from "../../../../../../graphql/mutations/deleteMyRoutineItemMutation";
import updateMyRoutineMutation from "../../../../../../graphql/mutations/updateMyRoutineMutation";
import { useMutation } from "@apollo/react-hooks";
import { css } from "@emotion/css";
import { BounceLoader } from "react-spinners";
import ACTION_MORNING_EYE_CREAM_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/EyeCream/ProductName/ACTION_MORNING_EYE_CREAM_PRODUCT_NAME";
import ACTION_MORNING_EYE_CREAM_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/EyeCream/ProductFrequency/ACTION_MORNING_EYE_CREAM_PRODUCT_FREQUENCY";
import ACTION_MORNING_EYE_CREAM_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/EyeCream/ProductUseNotes/ACTION_MORNING_EYE_CREAM_PRODUCT_USE_NOTES";
import ACTION_MORNING_EYE_CREAM_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/EyeCream/ProductLink/ACTION_MORNING_EYE_CREAM_PRODUCT_LINK";
import ACTION_RESET_ALL_MORNING_EYE_CREAM_FIELDS from "../../../../../../actions/MyRoutine/Morning/EyeCream/ACTION_RESET_ALL_MORNING_EYE_CREAM_FIELDS";

const MorningEyeCream = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const morningEyeCreamProductFrequency = useSelector(
    (state) =>
      state.morningEyeCreamProductFrequency.morning_eye_cream_product_frequency
  );
  const morningEyeCreamProductLink = useSelector(
    (state) => state.morningEyeCreamProductLink.morning_eye_cream_product_link
  );
  const morningEyeCreamProductName = useSelector(
    (state) => state.morningEyeCreamProductName.morning_eye_cream_product_name
  );
  const morningEyeCreamProductUseNotes = useSelector(
    (state) =>
      state.morningEyeCreamProductUseNotes.morning_eye_cream_product_use_notes
  );
  const [cardCollapseOpen, changeCardCollapseOpen] = useState(false);
  const [loadingSpinnerActive, changeLoadingSpinnerActive] = useState(false);
  const [removeProductClicked, changeRemoveProductClicked] = useState(false);

  const [addedProductScrapedImage, changeAddedProductScrapedImage] = useState(
    ""
  );
  const [addedProductLink, changeAddedProductLink] = useState("");

  const [updateMyRoutine, { data: updateRoutineData }] = useMutation(
    updateMyRoutineMutation
  );
  const [deleteMyRoutineItem, { data: deleteData }] = useMutation(
    deleteMyRoutineItemMutation
  );

  const urlRegex = /^(https?):\/\/[^\s$.?#].+[.]+[^\s]+$/gim;

  useEffect(() => {
    if (updateRoutineData || deleteData) {
      props.clientDataRefetch();
    }
  }, [updateRoutineData, deleteData, props]);

  useEffect(() => {
    if (loadingSpinnerActive) {
      const loadingDone = setTimeout(() => {
        props.handleBackToOverview();
        if (cardCollapseOpen) {
          changeCardCollapseOpen(false);
        }
        changeLoadingSpinnerActive(false);
        props.clientDataRefetch();
      }, 1000);
      return () => {
        clearTimeout(loadingDone);
      };
    }
  }, [cardCollapseOpen, loadingSpinnerActive, props]);

  useEffect(() => {
    return () => {
      changeCardCollapseOpen(false);
      window.scrollTo(0, 0);
    };
  }, []);

  const handleDeleteProduct = () => {
    if (props.getClientData) {
      if (props.getClientData.client.myRoutine) {
        if (props.getClientData.client.myRoutine.morningEyeCream[0]) {
          changeAddedProductLink("");
          changeAddedProductScrapedImage("");
          changeRemoveProductClicked(false);
          changeLoadingSpinnerActive(true);
          deleteMyRoutineItem({
            variables: {
              morningEyeCreamID:
                props.getClientData.client.myRoutine.morningEyeCream[0]._id,
            },
          });
        }
      }
    }
  };

  const handleProductName = (e) => {
    dispatch(
      ACTION_MORNING_EYE_CREAM_PRODUCT_NAME(e.currentTarget.value.trim())
    );
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_MORNING_EYE_CREAM_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_MORNING_EYE_CREAM_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(
      ACTION_MORNING_EYE_CREAM_PRODUCT_LINK(e.currentTarget.value.trim())
    );
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_MORNING_EYE_CREAM_FIELDS());
    };
  }, [dispatch]);

  const handleSubmitProduct = () => {
    if (morningEyeCreamProductName) {
      if (morningEyeCreamProductFrequency) {
        if (morningEyeCreamProductUseNotes) {
          if (urlRegex.test(morningEyeCreamProductLink)) {
            changeLoadingSpinnerActive(true);
            updateMyRoutine({
              variables: {
                morningEyeCream: {
                  name: morningEyeCreamProductName,
                  frequency: morningEyeCreamProductFrequency,
                  link: morningEyeCreamProductLink,
                  useNotes: morningEyeCreamProductUseNotes,
                },
              },
            });
          } else {
            return null;
          }
        }
      }
    }
  };

  const handleEmptyStateToggle = () => {
    if (props.addProductClicked) {
      return (
        <div className="my_individual_selected_item_add_product_container">
          <Form className="add_product_form">
            <FormGroup className="add_product_form_field">
              <Label for="productName">
                {" "}
                <div className="top_form_container">
                  <div className="required_label">
                    Product Name
                    <p className="required_label red_asterisk">* </p>
                  </div>
                  <div className="required_fields_container">
                    <p className="red_asterisk">* </p>{" "}
                    <p className="required_fields_statement">
                      {" "}
                      Required Fields
                    </p>
                  </div>
                </div>
              </Label>
              <Input
                type="text"
                name="productName"
                maxLength={100}
                placeholder="Enter product name"
                className="input_field_product"
                defaultValue={morningEyeCreamProductName}
                onChange={handleProductName}
              />
            </FormGroup>
            <FormGroup className="add_product_form_field">
              <Label for="frequencyOfUse">
                {" "}
                <div className="top_form_container">
                  <div className="required_label">
                    Frequency of Use
                    <p className="required_label red_asterisk">* </p>
                  </div>
                </div>
              </Label>
              <Input
                type="text"
                name="frequencyOfUse"
                maxLength={50}
                placeholder="Enter frequency, e.g. daily, etc."
                className="input_field_product"
                defaultValue={morningEyeCreamProductFrequency}
                onChange={handleProductFrequency}
              />
            </FormGroup>
            <FormGroup className="add_product_form_field">
              <Label for="productUsageDetails">
                <div className="required_label">
                  Product Usage Details
                  <p className="required_label red_asterisk">* </p>
                </div>
              </Label>
              <Input
                type="textarea"
                style={{
                  fontFamily: "Montserrat",
                }}
                placeholder="Enter a short description of your product usage here."
                className="product_usage_notes"
                maxLength={1000}
                defaultValue={morningEyeCreamProductUseNotes}
                onChange={handleProductUsageDetails}
              />
            </FormGroup>
            <FormGroup className="add_product_form_field">
              <Label for="productLink">
                {" "}
                <div className="top_form_container">
                  <div className="required_label">
                    Product Link
                    <p className="required_label red_asterisk">* </p>
                  </div>
                </div>
              </Label>
              <Input
                type="text"
                name="productLink"
                maxLength={500}
                placeholder="Enter a URL link to the product"
                className="input_field_product"
                defaultValue={morningEyeCreamProductLink}
                onChange={handleProductLink}
              />
              <p className="add_product_url_http_caption">
                Note: URL should begin with http:// or https://
              </p>
            </FormGroup>
          </Form>
          <div className="my_individual_selected_item_bottom_buttons_container">
            <div
              className="my_individual_selected_item_add_product_button"
              ref={props.submitProductRef}
              onClick={() => handleSubmitProduct()}
              style={{
                background:
                  morningEyeCreamProductName &&
                  morningEyeCreamProductUseNotes &&
                  morningEyeCreamProductFrequency &&
                  morningEyeCreamProductLink.match(urlRegex)
                    ? "rgb(44, 44, 52)"
                    : "#f0f0f0",
                pointerEvents:
                  morningEyeCreamProductName &&
                  morningEyeCreamProductUseNotes &&
                  morningEyeCreamProductFrequency &&
                  morningEyeCreamProductLink.match(urlRegex)
                    ? "auto"
                    : "none",
                transition: "background 0.5s ease",
              }}
            >
              <p
                style={{
                  color:
                    morningEyeCreamProductName &&
                    morningEyeCreamProductUseNotes &&
                    morningEyeCreamProductFrequency &&
                    morningEyeCreamProductLink.match(urlRegex)
                      ? "rgb(255, 255, 255)"
                      : "rgb(201, 201, 201)",
                  transition: "color 0.5s ease",
                }}
              >
                Submit Product
              </p>
            </div>
            <div
              className="my_individual_selected_item_back_to_routine_button"
              onClick={() => props.handleBackToOverview()}
            >
              <p>Back to Overview</p>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="my_individual_selected_item_empty_state_container">
          <div className="my_individual_selected_item_empty_state_icon_container">
            <svg
              className="my_individual_selected_item_empty_state_icon"
              height="5rem"
              width="100%"
              viewBox="0 0 50.006 50.006"
            >
              <path d="M19.284 38.721c-1.675-.22-3.21-1.08-4.574-2.56-.577-.624-1.41-1.896-1.833-2.797l-.139-.295.095-.214a13.8 13.8 0 01.843-1.52c1.372-2.106 3.117-3.406 5.16-3.847.356-.077.538-.09 1.213-.09.678 0 .854.013 1.212.09 1.94.423 3.573 1.584 4.913 3.492.383.545.681 1.043.95 1.586.258.52.252.467.095.802-.406.864-1.207 2.097-1.773 2.73-1.358 1.516-2.942 2.404-4.69 2.628a7.502 7.502 0 01-1.472-.005zm1.92-1.52a7.77 7.77 0 001.459-.53 9.312 9.312 0 001.412-.976c.64-.569 1.44-1.562 1.875-2.331l.166-.295-.114-.214c-.147-.272-.51-.823-.788-1.192-.819-1.09-1.939-1.987-3.047-2.44-.698-.285-1.32-.404-2.118-.404-.799 0-1.42.119-2.118.404-1.105.452-2.195 1.323-3.04 2.428a11.44 11.44 0 00-.794 1.201l-.115.217.166.295c.092.162.344.543.56.845 1.195 1.676 2.696 2.713 4.389 3.03.423.08 1.69.057 2.106-.038zm-1.67-1.366c-.662-.244-1.177-.921-1.41-1.85-.074-.3-.08-.374-.08-.916 0-.557.004-.61.088-.94.213-.84.667-1.475 1.268-1.773.212-.105.264-.114.649-.114.38 0 .438.01.637.109.325.161.563.374.806.72 1.092 1.555.565 4.223-.942 4.767a1.656 1.656 0 01-1.016-.003z" />
              <path d="M8.418 41.731c-.924-.249-1.97-1.187-2.425-2.176-.48-1.042-.466-.73-.466-10.323 0-6.793.02-8.756.093-8.922.17-.388.525-.512 1.46-.512.465 0 .844-.018.844-.039s.051-.492.114-1.046c.57-5.06 1.954-8.243 4.51-10.379.51-.426.862-.586 1.147-.521.234.053.679.542.679.746 0 .062.139.358.309.659 1.52 2.692 4.487 4.408 8.69 5.028.35.051 1.397.129 2.325.171 1.804.083 2.152.155 2.937.606 1.262.725 2.374 2.41 2.744 4.155l.13.618h.884c1.062.001 1.357.108 1.52.55.164.45.16 17.132-.004 18.02-.273 1.464-1.12 2.618-2.368 3.221l-.406.196-11.211.014c-6.664.008-11.331-.019-11.505-.066zm22.802-1.972c.212-.128.505-.391.652-.587.515-.684.5-.473.5-7.095v-5.962H7.1v5.76c0 3.822.028 5.904.082 6.191.152.81.83 1.645 1.52 1.874.139.046 4.74.073 11.184.064l10.95-.014zm1.152-16.76v-1.324H7.1v1.267c0 .696.023 1.292.05 1.323.028.032 5.714.057 12.636.057h12.586zm-2.509-3.437c-.027-.13-.184-.553-.349-.943-.368-.87-1.024-1.668-1.665-2.022-.418-.231-.514-.246-2.24-.353-3.37-.21-5.422-.678-7.553-1.727-1.898-.935-3.633-2.461-4.533-3.988l-.321-.545-.383.382c-1.716 1.71-2.838 4.822-3.269 9.068l-.037.363h20.4zm6.461 22.044c-.183-.208-.203-.292-.208-.88-.003-.358-.008-6.288-.01-13.18-.004-14.053-.055-12.86.556-13.048.212-.066.968-.086 2.306-.063 1.83.031 2.03.05 2.47.226.9.361 1.505.92 1.986 1.834.515.976.497.563.497 11.66 0 6.964-.025 10.127-.083 10.443-.229 1.252-.962 2.306-1.994 2.867l-.585.318-4.732.053zm4.682-1.704c.46-.178.816-.533 1.08-1.077l.223-.457V17.96l-.203-.437c-.227-.49-.551-.837-.997-1.069-.26-.134-.512-.156-1.856-.157l-1.557-.002v23.737h1.487c1.137 0 1.566-.03 1.823-.13z" />
            </svg>
          </div>
          <div className="my_individual_selected_item_empty_state_text_container">
            <h2>No morning eye cream information</h2>
            <p>
              Start by adding some product information and check back here after
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
      );
    }
  };

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const overrideImg = css`
    display: flex;
    position: relative;
    alignitems: center;
    justifycontent: center;
  `;

  useEffect(() => {
    if (props.getClientData) {
      if (props.getClientData.client.myRoutine) {
        if (props.getClientData.client.myRoutine.morningEyeCream.length > 0) {
          fetch(
            "http://localhost:4000/" +
              props.getClientData.client.myRoutine.morningEyeCream[0].link,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4",
              },
            }
          )
            .then((res) => res.json())
            .then((data) => {
              changeAddedProductLink(data.url);
              changeAddedProductScrapedImage(data.image);
            });
        }
      }
    }
  }, [props.getClientData]);

  return (
    <div
      className="skin_care_routine_morning_my_routine_individual_item_container"
      onClick={(e) => props.handleItemToggled(e, "morning_eye_cream")}
      ref={props.individualItemMorningRef}
    >
      <Modal
        className="cancel_appointment_modal"
        isOpen={removeProductClicked || loadingSpinnerActive}
        style={{
          content: {
            position: "fixed",
            zIndex: 10000,
            opacity: 0.99,
            height: "100%",
            backdropFilter: "blur(5px)",
            WebkitBackdropFilter: "blur(5px)",
            paddingBottom: "10%",
            borderRadius: "none",
            width: "100vw",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <BounceLoader
          size={100}
          css={override}
          color={"rgb(44, 44, 52)"}
          loading={loadingSpinnerActive}
        />
        <Transition
          items={removeProductClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(removeProductClicked) =>
            removeProductClicked &&
            ((styleprops) => (
              <div
                className="cancel_appointment_modal_content_container"
                style={styleprops}
              >
                <div className="log_out_modal_contents">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() => changeRemoveProductClicked(false)}
                  />
                  <h2>Are you sure you want to remove this added product?</h2>
                  <span className="logout_buttons_container">
                    <div
                      className="logout_button"
                      onClick={() => handleDeleteProduct()}
                    >
                      <p>REMOVE</p>
                    </div>
                    <div
                      className="cancel_logout_button"
                      onClick={() => changeRemoveProductClicked(false)}
                    >
                      <p>CANCEL</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
      <div className="skin_care_routine_icon_container">
        <svg height="3rem" width="100%" viewBox="0 0 50.006 50.006">
          <path d="M19.284 38.721c-1.675-.22-3.21-1.08-4.574-2.56-.577-.624-1.41-1.896-1.833-2.797l-.139-.295.095-.214a13.8 13.8 0 01.843-1.52c1.372-2.106 3.117-3.406 5.16-3.847.356-.077.538-.09 1.213-.09.678 0 .854.013 1.212.09 1.94.423 3.573 1.584 4.913 3.492.383.545.681 1.043.95 1.586.258.52.252.467.095.802-.406.864-1.207 2.097-1.773 2.73-1.358 1.516-2.942 2.404-4.69 2.628a7.502 7.502 0 01-1.472-.005zm1.92-1.52a7.77 7.77 0 001.459-.53 9.312 9.312 0 001.412-.976c.64-.569 1.44-1.562 1.875-2.331l.166-.295-.114-.214c-.147-.272-.51-.823-.788-1.192-.819-1.09-1.939-1.987-3.047-2.44-.698-.285-1.32-.404-2.118-.404-.799 0-1.42.119-2.118.404-1.105.452-2.195 1.323-3.04 2.428a11.44 11.44 0 00-.794 1.201l-.115.217.166.295c.092.162.344.543.56.845 1.195 1.676 2.696 2.713 4.389 3.03.423.08 1.69.057 2.106-.038zm-1.67-1.366c-.662-.244-1.177-.921-1.41-1.85-.074-.3-.08-.374-.08-.916 0-.557.004-.61.088-.94.213-.84.667-1.475 1.268-1.773.212-.105.264-.114.649-.114.38 0 .438.01.637.109.325.161.563.374.806.72 1.092 1.555.565 4.223-.942 4.767a1.656 1.656 0 01-1.016-.003z" />
          <path d="M8.418 41.731c-.924-.249-1.97-1.187-2.425-2.176-.48-1.042-.466-.73-.466-10.323 0-6.793.02-8.756.093-8.922.17-.388.525-.512 1.46-.512.465 0 .844-.018.844-.039s.051-.492.114-1.046c.57-5.06 1.954-8.243 4.51-10.379.51-.426.862-.586 1.147-.521.234.053.679.542.679.746 0 .062.139.358.309.659 1.52 2.692 4.487 4.408 8.69 5.028.35.051 1.397.129 2.325.171 1.804.083 2.152.155 2.937.606 1.262.725 2.374 2.41 2.744 4.155l.13.618h.884c1.062.001 1.357.108 1.52.55.164.45.16 17.132-.004 18.02-.273 1.464-1.12 2.618-2.368 3.221l-.406.196-11.211.014c-6.664.008-11.331-.019-11.505-.066zm22.802-1.972c.212-.128.505-.391.652-.587.515-.684.5-.473.5-7.095v-5.962H7.1v5.76c0 3.822.028 5.904.082 6.191.152.81.83 1.645 1.52 1.874.139.046 4.74.073 11.184.064l10.95-.014zm1.152-16.76v-1.324H7.1v1.267c0 .696.023 1.292.05 1.323.028.032 5.714.057 12.636.057h12.586zm-2.509-3.437c-.027-.13-.184-.553-.349-.943-.368-.87-1.024-1.668-1.665-2.022-.418-.231-.514-.246-2.24-.353-3.37-.21-5.422-.678-7.553-1.727-1.898-.935-3.633-2.461-4.533-3.988l-.321-.545-.383.382c-1.716 1.71-2.838 4.822-3.269 9.068l-.037.363h20.4zm6.461 22.044c-.183-.208-.203-.292-.208-.88-.003-.358-.008-6.288-.01-13.18-.004-14.053-.055-12.86.556-13.048.212-.066.968-.086 2.306-.063 1.83.031 2.03.05 2.47.226.9.361 1.505.92 1.986 1.834.515.976.497.563.497 11.66 0 6.964-.025 10.127-.083 10.443-.229 1.252-.962 2.306-1.994 2.867l-.585.318-4.732.053zm4.682-1.704c.46-.178.816-.533 1.08-1.077l.223-.457V17.96l-.203-.437c-.227-.49-.551-.837-.997-1.069-.26-.134-.512-.156-1.856-.157l-1.557-.002v23.737h1.487c1.137 0 1.566-.03 1.823-.13z" />
        </svg>
      </div>
      <h2>Eye Cream</h2>
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
          itemToggled === "morning_eye_cream" &&
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
                  <p>Eye Cream (AM)</p>
                </div>
              </div>
              {props.getClientData ? (
                props.getClientData.client.myRoutine ? (
                  props.getClientData.client.myRoutine.morningEyeCream.length >
                  0 ? (
                    <>
                      <div className="my_routine_added_products_number_header">
                        <h2>
                          Added Product
                          {props.getClientData.client.myRoutine.morningEyeCream
                            .length > 1
                            ? "s"
                            : null}{" "}
                          (
                          {
                            props.getClientData.client.myRoutine.morningEyeCream
                              .length
                          }
                          )
                        </h2>
                      </div>
                      <div className="my_routine_added_product_page_container">
                        <div className="my_routine_added_product_container">
                          <div className="added_product_small_hero_image_link_container">
                            <a
                              href={addedProductLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {addedProductScrapedImage ? (
                                <img
                                  src={addedProductScrapedImage}
                                  alt="Added Product"
                                />
                              ) : (
                                <BounceLoader
                                  className="added_product_loading_spinner_image"
                                  size={50}
                                  css={overrideImg}
                                  color={"rgb(44, 44, 52)"}
                                  loading={!addedProductScrapedImage}
                                />
                              )}
                            </a>
                          </div>
                          <a
                            href={addedProductLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={faExternalLinkAlt}
                              className="my_routine_added_product_external_link_icon"
                            />
                          </a>
                          <Collapse isOpen={cardCollapseOpen}>
                            <div className="my_routine_added_product_expanded_container">
                              <div className="my_routine_added_product_expanded_item_field">
                                <h2>Use Frequency</h2>
                                <p>
                                  {
                                    props.getClientData.client.myRoutine
                                      .morningEyeCream[0].frequency
                                  }
                                </p>
                              </div>
                              <div className="my_routine_added_product_expanded_item_field">
                                <h2>Use Notes</h2>
                                <p>
                                  {props.getClientData.client.myRoutine
                                    .morningEyeCream[0].useNotes
                                    ? props.getClientData.client.myRoutine
                                        .morningEyeCream[0].useNotes
                                    : "None"}
                                </p>
                              </div>
                            </div>
                          </Collapse>
                          <div className="my_routine_added_product_text_details_container">
                            <div className="my_routine_added_product_individual_details_container">
                              <h2>
                                {
                                  props.getClientData.client.myRoutine
                                    .morningEyeCream[0].name
                                }
                              </h2>
                            </div>
                            <div className="my_routine_added_product_bottom_buttons_container">
                              <div
                                className="my_routine_added_product_see_more_button"
                                onClick={() =>
                                  changeCardCollapseOpen(!cardCollapseOpen)
                                }
                              >
                                <p>
                                  {cardCollapseOpen ? "See Less" : "See More"}
                                </p>
                              </div>
                              <div
                                className="my_routine_added_product_remove_button"
                                onClick={() => changeRemoveProductClicked(true)}
                              >
                                <p>Remove</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="my_routine_added_product_back_to_routine_button_container">
                          <div
                            className="my_routine_added_product_back_to_routine_button"
                            onClick={() => props.changeItemToggled("")}
                          >
                            <p>Back to Routine</p>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    handleEmptyStateToggle()
                  )
                ) : (
                  handleEmptyStateToggle()
                )
              ) : (
                handleEmptyStateToggle()
              )}
            </div>
          ))
        }
      </Transition>
    </div>
  );
});

export default MorningEyeCream;
