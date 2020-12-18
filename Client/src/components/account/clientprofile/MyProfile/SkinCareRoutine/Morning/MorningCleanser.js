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
import { useMutation } from "@apollo/react-hooks";
import deleteMyRoutineItemMutation from "../../../../../../graphql/mutations/deleteMyRoutineItemMutation";
import updateMyRoutineMutation from "../../../../../../graphql/mutations/updateMyRoutineMutation";
import { BounceLoader } from "react-spinners";
import { css } from "@emotion/css";
import ACTION_MORNING_CLEANSER_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/Cleanser/ProductName/ACTION_MORNING_CLEANSER_NAME";
import ACTION_MORNING_CLEANSER_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/Cleanser/ProductFrequency/ACTION_MORNING_CLEANSER_PRODUCT_FREQUENCY";
import ACTION_MORNING_CLEANSER_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/Cleanser/ProductUseNotes/ACTION_MORNING_CLEANSER_PRODUCT_USE_NOTES";
import ACTION_MORNING_CLEANSER_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/Cleanser/ProductLink/ACTION_MORNING_CLEANSER_PRODUCT_LINK";
import ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS from "../../../../../../actions/MyRoutine/Morning/Cleanser/ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS";

const MorningCleanser = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const morningCleanserProductFrequency = useSelector(
    (state) =>
      state.morningCleanserProductFrequency.morning_cleanser_product_frequency
  );
  const morningCleanserProductLink = useSelector(
    (state) => state.morningCleanserProductLink.morning_cleanser_product_link
  );
  const morningCleanserProductName = useSelector(
    (state) => state.morningCleanserProductName.morning_cleanser_product_name
  );
  const morningCleanserProductUseNotes = useSelector(
    (state) =>
      state.morningCleanserProductUseNotes.morning_cleanser_product_use_notes
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
        if (props.getClientData.client.myRoutine.morningCleanser[0]) {
          changeAddedProductLink("");
          changeAddedProductScrapedImage("");
          changeRemoveProductClicked(false);
          changeLoadingSpinnerActive(true);
          deleteMyRoutineItem({
            variables: {
              morningCleanserID:
                props.getClientData.client.myRoutine.morningCleanser[0]._id,
            },
          });
        }
      }
    }
  };

  const handleProductName = (e) => {
    dispatch(
      ACTION_MORNING_CLEANSER_PRODUCT_NAME(e.currentTarget.value.trim())
    );
  };

  const handleProductFrequency = (e) => {
    dispatch(
      ACTION_MORNING_CLEANSER_PRODUCT_FREQUENCY(e.currentTarget.value.trim())
    );
  };

  const handleProductUsageDetails = (e) => {
    dispatch(
      ACTION_MORNING_CLEANSER_PRODUCT_USE_NOTES(e.currentTarget.value.trim())
    );
  };

  const handleProductLink = (e) => {
    dispatch(
      ACTION_MORNING_CLEANSER_PRODUCT_LINK(e.currentTarget.value.trim())
    );
  };

  useEffect(() => {
    return () => {
      dispatch(ACTION_RESET_ALL_MORNING_CLEANSER_FIELDS());
    };
  }, [dispatch]);

  const handleSubmitProduct = () => {
    if (morningCleanserProductName) {
      if (morningCleanserProductFrequency) {
        if (morningCleanserProductUseNotes) {
          if (urlRegex.test(morningCleanserProductLink)) {
            changeLoadingSpinnerActive(true);
            updateMyRoutine({
              variables: {
                morningCleanser: {
                  name: morningCleanserProductName,
                  frequency: morningCleanserProductFrequency,
                  link: morningCleanserProductLink,
                  useNotes: morningCleanserProductUseNotes,
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
                defaultValue={morningCleanserProductName}
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
                defaultValue={morningCleanserProductFrequency}
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
                defaultValue={morningCleanserProductUseNotes}
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
                defaultValue={morningCleanserProductLink}
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
                  morningCleanserProductName &&
                  morningCleanserProductUseNotes &&
                  morningCleanserProductFrequency &&
                  morningCleanserProductLink.match(urlRegex)
                    ? "rgb(44, 44, 52)"
                    : "#f0f0f0",
                pointerEvents:
                  morningCleanserProductName &&
                  morningCleanserProductUseNotes &&
                  morningCleanserProductFrequency &&
                  morningCleanserProductLink.match(urlRegex)
                    ? "auto"
                    : "none",
                transition: "background 0.5s ease",
              }}
            >
              <p
                style={{
                  color:
                    morningCleanserProductName &&
                    morningCleanserProductUseNotes &&
                    morningCleanserProductFrequency &&
                    morningCleanserProductLink.match(urlRegex)
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
            <svg viewBox="0 0 50.006 50.006" height="5rem" width="100%">
              <path
                className="my_individual_selected_item_empty_state_icon"
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
            <h2>No morning cleanser information</h2>
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
        if (props.getClientData.client.myRoutine.morningCleanser.length > 0) {
          fetch(
            "http://localhost:4000/" +
              props.getClientData.client.myRoutine.morningCleanser[0].link,
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
      onClick={(e) => props.handleItemToggled(e, "morning_cleanser")}
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
          itemToggled === "morning_cleanser" &&
          ((styleprops) => (
            <div
              className="my_individual_selected_item_container"
              style={styleprops}
              ref={props.pageContainerRef}
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
                  <p>Cleanser (AM)</p>
                </div>
              </div>
              {props.getClientData ? (
                props.getClientData.client.myRoutine ? (
                  props.getClientData.client.myRoutine.morningCleanser.length >
                  0 ? (
                    <>
                      <div className="my_routine_added_products_number_header">
                        <h2>
                          Added Product
                          {props.getClientData.client.myRoutine.morningCleanser
                            .length > 1
                            ? "s"
                            : null}{" "}
                          (
                          {
                            props.getClientData.client.myRoutine.morningCleanser
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
                                      .morningCleanser[0].frequency
                                  }
                                </p>
                              </div>
                              <div className="my_routine_added_product_expanded_item_field">
                                <h2>Use Notes</h2>
                                <p>
                                  {props.getClientData.client.myRoutine
                                    .morningCleanser[0].useNotes
                                    ? props.getClientData.client.myRoutine
                                        .morningCleanser[0].useNotes
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
                                    .morningCleanser[0].name
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

export default MorningCleanser;
