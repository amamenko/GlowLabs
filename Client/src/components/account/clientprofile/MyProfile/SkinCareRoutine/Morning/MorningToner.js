import React, { useEffect, useState } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, FormGroup, Label, Input, Collapse, Modal } from "reactstrap";
import {
  faPlusCircle,
  faLongArrowAltLeft,
  faTimes,
  faExternalLinkAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "@apollo/react-hooks";
import deleteMyRoutineItemMutation from "../../../../../../graphql/mutations/deleteMyRoutineItemMutation";
import updateMyRoutineMutation from "../../../../../../graphql/mutations/updateMyRoutineMutation";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/css";
import ACTION_MORNING_TONER_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/Toner/ProductName/ACTION_MORNING_TONER_PRODUCT_NAME";
import ACTION_MORNING_TONER_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/Toner/ProductFrequency/ACTION_MORNING_TONER_PRODUCT_FREQUENCY";
import ACTION_MORNING_TONER_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/Toner/ProductUseNotes/ACTION_MORNING_TONER_PRODUCT_USE_NOTES";
import ACTION_MORNING_TONER_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/Toner/ProductLink/ACTION_MORNING_TONER_PRODUCT_LINK";
import ACTION_RESET_ALL_MORNING_TONER_FIELDS from "../../../../../../actions/MyRoutine/Morning/Toner/ACTION_RESET_ALL_MORNING_TONER_FIELDS";

const MorningToner = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const morningTonerProductFrequency = useSelector(
    (state) =>
      state.morningTonerProductFrequency.morning_toner_product_frequency
  );
  const morningTonerProductLink = useSelector(
    (state) => state.morningTonerProductLink.morning_toner_product_link
  );
  const morningTonerProductName = useSelector(
    (state) => state.morningTonerProductName.morning_toner_product_name
  );
  const morningTonerProductUseNotes = useSelector(
    (state) => state.morningTonerProductUseNotes.morning_toner_product_use_notes
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
        if (props.getClientData.client.myRoutine.morningToner[0]) {
          changeAddedProductLink("");
          changeAddedProductScrapedImage("");
          changeRemoveProductClicked(false);
          changeLoadingSpinnerActive(true);
          deleteMyRoutineItem({
            variables: {
              morningTonerID:
                props.getClientData.client.myRoutine.morningToner[0]._id,
            },
          });
        }
      }
    }
  };

  const handleProductName = (e) => {
    dispatch(ACTION_MORNING_TONER_PRODUCT_NAME(e.currentTarget.value.trim()));
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_MORNING_TONER_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_MORNING_TONER_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(ACTION_MORNING_TONER_PRODUCT_LINK(e.currentTarget.value.trim()));
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_MORNING_TONER_FIELDS());
    };
  }, [dispatch]);

  const handleSubmitProduct = () => {
    if (morningTonerProductName) {
      if (morningTonerProductFrequency) {
        if (morningTonerProductUseNotes) {
          if (urlRegex.test(morningTonerProductLink)) {
            changeLoadingSpinnerActive(true);
            updateMyRoutine({
              variables: {
                morningToner: {
                  name: morningTonerProductName,
                  frequency: morningTonerProductFrequency,
                  link: morningTonerProductLink,
                  useNotes: morningTonerProductUseNotes,
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
                defaultValue={morningTonerProductName}
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
                defaultValue={morningTonerProductFrequency}
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
                defaultValue={morningTonerProductUseNotes}
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
                defaultValue={morningTonerProductLink}
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
                  morningTonerProductName &&
                  morningTonerProductUseNotes &&
                  morningTonerProductFrequency &&
                  morningTonerProductLink.match(urlRegex)
                    ? "rgb(44, 44, 52)"
                    : "#f0f0f0",
                pointerEvents:
                  morningTonerProductName &&
                  morningTonerProductUseNotes &&
                  morningTonerProductFrequency &&
                  morningTonerProductLink.match(urlRegex)
                    ? "auto"
                    : "none",
                transition: "background 0.5s ease",
              }}
            >
              <p
                style={{
                  color:
                    morningTonerProductName &&
                    morningTonerProductUseNotes &&
                    morningTonerProductFrequency &&
                    morningTonerProductLink.match(urlRegex)
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
              <path d="M16.847 47.9c-1.354-.265-2.44-1.156-2.993-2.454l-.228-.533V14.676l.181-.451a4.083 4.083 0 012.675-2.434l.502-.15.002-2.894c0-3.2.03-3.444.492-4.238.348-.598 1.156-1.314 1.798-1.594 1.018-.445 1.078-.45 5.508-.426l4.012.022.544.19c1.42.496 2.392 1.504 2.694 2.797.092.39.117 1.108.118 3.32l.002 2.823.515.154c1.282.384 2.224 1.276 2.666 2.525l.177.498V44.77l-.175.498c-.485 1.384-1.738 2.421-3.217 2.663-.748.122-14.634.094-15.273-.031zm15.563-1.657c.609-.27 1.018-.669 1.25-1.22.149-.352.153-.726.153-15.228 0-14.32-.006-14.881-.147-15.216-.301-.714-.907-1.205-1.72-1.396-.686-.161-14.068-.161-14.754 0-.808.19-1.452.71-1.746 1.41-.112.267-.122 1.78-.103 15.309l.022 15.012.174.293c.377.635.897 1.022 1.603 1.194.372.09 1.468.104 7.587.092l7.152-.014zm-14.927-22.6c-.509-.199-.499-.108-.499-4.524v-3.994l.269-.242.268-.242h14.077l.516.415.022 4.026c.024 4.478.037 4.363-.498 4.564-.395.149-13.775.146-14.154-.003zm13.011-4.484v-3.024H18.643v6.047h11.851zm0-10.235c0-1.505-.035-2.824-.08-3.04-.201-.953-.94-1.646-1.958-1.837-.57-.106-7.205-.106-7.775 0-.787.148-1.479.652-1.83 1.336-.162.317-.17.44-.193 3.264l-.023 2.935h11.859z" />
            </svg>
          </div>
          <div className="my_individual_selected_item_empty_state_text_container">
            <h2>No morning toner information</h2>
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
        if (props.getClientData.client.myRoutine.morningToner.length > 0) {
          fetch(
            "http://localhost:4000/" +
              props.getClientData.client.myRoutine.morningToner[0].link,
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
      onClick={(e) => props.handleItemToggled(e, "morning_toner")}
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
          itemToggled === "morning_toner" &&
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
                  <p>Toner (AM)</p>
                </div>
              </div>
              {props.getClientData ? (
                props.getClientData.client.myRoutine ? (
                  props.getClientData.client.myRoutine.morningToner.length >
                  0 ? (
                    <>
                      <div className="my_routine_added_products_number_header">
                        <h2>
                          Added Product
                          {props.getClientData.client.myRoutine.morningToner
                            .length > 1
                            ? "s"
                            : null}{" "}
                          (
                          {
                            props.getClientData.client.myRoutine.morningToner
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
                                      .morningToner[0].frequency
                                  }
                                </p>
                              </div>
                              <div className="my_routine_added_product_expanded_item_field">
                                <h2>Use Notes</h2>
                                <p>
                                  {props.getClientData.client.myRoutine
                                    .morningToner[0].useNotes
                                    ? props.getClientData.client.myRoutine
                                        .morningToner[0].useNotes
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
                                    .morningToner[0].name
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

export default MorningToner;
