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
import { css } from "@emotion/css";
import { BounceLoader } from "react-spinners";
import ACTION_RESET_ALL_SPF_FIELDS from "../../../../../../actions/MyRoutine/Morning/SPF/ACTION_RESET_ALL_SPF_FIELDS";
import ACTION_SPF_PRODUCT_NAME from "../../../../../../actions/MyRoutine/Morning/SPF/ProductName/ACTION_SPF_PRODUCT_NAME";
import ACTION_SPF_PRODUCT_FREQUENCY from "../../../../../../actions/MyRoutine/Morning/SPF/ProductFrequency/ACTION_SPF_PRODUCT_FREQUENCY";
import ACTION_SPF_PRODUCT_USE_NOTES from "../../../../../../actions/MyRoutine/Morning/SPF/ProductUseNotes/ACTION_SPF_PRODUCT_USE_NOTES";
import ACTION_SPF_PRODUCT_LINK from "../../../../../../actions/MyRoutine/Morning/SPF/ProductLink/ACTION_SPF_PRODUCT_LINK";

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
        if (props.getClientData.client.myRoutine.morningSPF[0]) {
          changeAddedProductLink("");
          changeAddedProductScrapedImage("");
          changeRemoveProductClicked(false);
          changeLoadingSpinnerActive(true);
          deleteMyRoutineItem({
            variables: {
              morningSPFID:
                props.getClientData.client.myRoutine.morningSPF[0]._id,
            },
          });
        }
      }
    }
  };

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

  const handleSubmitProduct = () => {
    if (spfProductName) {
      if (spfProductFrequency) {
        if (spfProductUseNotes) {
          if (urlRegex.test(spfProductLink)) {
            changeLoadingSpinnerActive(true);
            updateMyRoutine({
              variables: {
                morningSPF: {
                  name: spfProductName,
                  frequency: spfProductFrequency,
                  link: spfProductLink,
                  useNotes: spfProductUseNotes,
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
                defaultValue={spfProductName}
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
                defaultValue={spfProductFrequency}
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
                defaultValue={spfProductUseNotes}
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
                defaultValue={spfProductLink}
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
                  spfProductName &&
                  spfProductUseNotes &&
                  spfProductFrequency &&
                  spfProductLink.match(urlRegex)
                    ? "rgb(44, 44, 52)"
                    : "#f0f0f0",
                pointerEvents:
                  spfProductName &&
                  spfProductUseNotes &&
                  spfProductFrequency &&
                  spfProductLink.match(urlRegex)
                    ? "auto"
                    : "none",
                transition: "background 0.5s ease",
              }}
            >
              <p
                style={{
                  color:
                    spfProductName &&
                    spfProductUseNotes &&
                    spfProductFrequency &&
                    spfProductLink.match(urlRegex)
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
              <path d="M18.26 43.005c0-3.431-.06-4.147-.363-4.395-1.504-1.227-3-6.15-3.928-12.932-.667-4.867-1.531-16.786-1.533-21.132v-.973h26.328l-.127 2.691c-.654 13.945-1.403 21.041-2.797 26.495-.624 2.442-1.701 4.977-2.446 5.757-.398.417-.452.895-.51 4.467l-.063 4-14.561.121zm13.28 2.374c0-.274-.345-.344-1.703-.344-1.136 0-1.853-.111-2.155-.336-.627-.466-3.666-.478-4.056-.016-.195.231-.864.355-2.164.4-1.249.045-1.915.163-1.98.353-.075.224 1.224.287 5.981.287 5.247 0 6.077-.047 6.077-.344zm-8.27-1.947c.992-.646 3.935-.646 4.775 0 .435.334.953.45 2.039.453l1.456.005v-4.582H19.425v2.139c0 1.175.07 2.206.155 2.29.086.084.793.152 1.573.152 1.022-.002 1.612-.129 2.116-.457zm9.307-5.863c2.09-2.055 4.108-14.198 4.604-27.697l.067-1.833-1.34-.069c-1.247-.064-1.34-.107-1.34-.63 0-.533.07-.56 1.399-.56h1.397V4.716h-23.53V6.78h18.871v1.145h-18.87v.634c0 .349.105 2.282.235 4.296.833 12.945 2.362 21.867 4.177 24.374l.512.706h6.723c5.844 0 6.773-.048 7.096-.365zm-7.56-7.195c0-.824.058-.916.582-.916.524 0 .583.092.583.916s-.059.917-.583.917-.582-.092-.582-.917zm-5.366-1.497c-.248-.294-.189-.462.363-1.029.622-.638.685-.655 1.089-.296.414.369.407.404-.202 1.03-.728.746-.845.774-1.25.295zm10.485-.226c-.552-.578-.552-.58-.088-1.035.464-.456.465-.456 1.13.226.557.572.617.74.369 1.035-.42.496-.775.44-1.41-.226zm-5.51-.369c-3.164-.548-5.05-3.499-4.16-6.51.693-2.342 2.62-3.768 5.092-3.768 3.047 0 5.283 2.215 5.283 5.234 0 3.269-2.896 5.62-6.215 5.044zm3.31-1.907c.95-.713 1.727-2.156 1.734-3.225.008-1.008-.919-2.656-1.826-3.248-1.601-1.047-3.473-.958-4.848.229-2.306 1.99-1.805 5.455.972 6.724 1.109.507 2.95.284 3.969-.48zm-10.608-3.217c0-.515.093-.572.932-.572s.932.057.932.572c0 .516-.093.573-.932.573s-.932-.057-.932-.573zm14.444 0c0-.526.085-.572 1.048-.572.963 0 1.049.046 1.049.572 0 .526-.086.573-1.049.573s-1.048-.047-1.048-.573zM19.93 18.62c-.6-.627-.632-.914-.149-1.309.3-.244.47-.186 1.047.357.646.608.665.675.305 1.066-.493.535-.593.525-1.203-.114zm10.14.123c-.371-.403-.355-.462.308-1.086.66-.622.723-.638 1.098-.269.376.37.358.431-.308 1.086-.683.673-.719.681-1.098.269zm-5.055-2.8c0-.824.058-.916.582-.916.524 0 .583.092.583.917 0 .824-.059.916-.583.916s-.582-.092-.582-.916z" />
            </svg>
          </div>
          <div className="my_individual_selected_item_empty_state_text_container">
            <h2>No SPF information</h2>
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
        if (props.getClientData.client.myRoutine.morningSPF.length > 0) {
          fetch(
            "http://localhost:4000/" +
              props.getClientData.client.myRoutine.morningSPF[0].link,
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
      onClick={(e) => props.handleItemToggled(e, "morning_spf")}
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

              {props.getClientData ? (
                props.getClientData.client.myRoutine ? (
                  props.getClientData.client.myRoutine.morningSPF.length > 0 ? (
                    <>
                      <div className="my_routine_added_products_number_header">
                        <h2>
                          Added Product
                          {props.getClientData.client.myRoutine.morningSPF
                            .length > 1
                            ? "s"
                            : null}{" "}
                          (
                          {
                            props.getClientData.client.myRoutine.morningSPF
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
                                      .morningSPF[0].frequency
                                  }
                                </p>
                              </div>
                              <div className="my_routine_added_product_expanded_item_field">
                                <h2>Use Notes</h2>
                                <p>
                                  {props.getClientData.client.myRoutine
                                    .morningSPF[0].useNotes
                                    ? props.getClientData.client.myRoutine
                                        .morningSPF[0].useNotes
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
                                    .morningSPF[0].name
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

export default MorningSPF;
