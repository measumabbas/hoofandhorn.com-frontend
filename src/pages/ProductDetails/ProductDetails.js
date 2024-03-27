import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  getSingleProduct,
} from "../../features/products/products";
import { conditionalRender } from "../../utills/conditionalRender";
import PageLoader from "../../components/styled/PageLoader/PageLoader";
import GlobalErrorHandler from "../../components/styled/GlobalErrorHandler/GlobalErrorHandler";
import Flex from "../../components/styled/Flex/Flex";
import { MapPin, DollarSign } from "react-feather";
import { timeDifference } from "../../utills/prettifyDate";
import { FaWhatsapp } from "react-icons/fa";
import Popup from "../../components/styled/Popup/Popup";
import {
  clearState,
  createOrder,
} from "../../features/sellerDashboard/orderSlice";
import BtnLoader from "../../components/styled/BtnLoader/BtnLoader";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Button from "../../components/styled/Button/Button";
import ReactStars from "react-stars";
const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    getLoading,
    getError,
    product,
    addRatingLoading,
    addRatingError,
    addRatingSuccess,
  } = useSelector((state) => state.products);
  const { addLoading, addError, addSuccess } = useSelector(
    (state) => state.orders
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleProduct({ id }));
  }, [id, dispatch]);
  useEffect(() => {
    if (addSuccess) {
      toast.success(
        "Order has been placed successfully seller will contact with you soon",
        {
          position: "top-right",
        }
      );
      setOrderPopup(false);
      setAddRatingPopup(true);
      dispatch(clearState());
    }
    if (addRatingSuccess) {
      toast.success("Rating added successfully", {
        position: "top-right",
      });
      setOrderPopup(false);
      setAddRatingPopup(false);
      dispatch(clearState());
    }
    if (addError) {
      toast.error(addError, {
        position: "top-right",
      });
      dispatch(clearState());
    }
    if (addRatingError) {
      toast.error(addRatingError, {
        position: "top-right",
      });
      dispatch(clearState());
    }
  }, [addSuccess, addError, dispatch, addRatingSuccess, addRatingError]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [orderPopup, setOrderPopup] = useState(false);
  const [addRetingPopup, setAddRatingPopup] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  return (
    <div>
      <Navbar />
      <div className="product-details-container container">
        <div className="product-details-inner">
          {conditionalRender(
            getLoading,
            <PageLoader />,
            conditionalRender(
              !getError,
              <div className="product-details-main">
                <div className="product-details-left">
                  <div className="product-details-left-img">
                    <img src={product?.image} alt={product?.name} />
                  </div>
                  <div className="product-details-left-down">
                    <Flex
                      align="center"
                      justify="space-between"
                      className="div"
                    >
                      <h2>{product?.name}</h2>
                      <Flex align="center" gap={15}>
                        <MapPin />
                        <span>{product?.address}</span>
                      </Flex>
                    </Flex>
                    <p className="mb-40">
                      Posted {timeDifference(product?.createdAt)} Ago
                    </p>

                    {product?.parent_category === "1" && (
                      <div className="product-details-features mb-30">
                        <h2 className="mb-20">Features</h2>
                        <div className="features">
                          <Flex gap={10}>
                            <div className="feature-image-box">
                              <img src="/icons/gender.png" alt="" />
                            </div>
                            <Flex direction="column">
                              <span>Gender</span>
                              <span>{product?.gender}</span>
                            </Flex>
                          </Flex>
                          <Flex gap={10}>
                            <div className="feature-image-box">
                              <img src="/icons/age.png" alt="" />
                            </div>
                            <Flex direction="column">
                              <span>Age</span>
                              <span>{product?.age} Years</span>
                            </Flex>
                          </Flex>
                          <Flex gap={10}>
                            <div className="feature-image-box">
                              <img src="/icons/weight.png" alt="" />
                            </div>
                            <Flex direction="column">
                              <span>Weight</span>
                              {product?.parent_category === "0" && (
                                <span>{product?.weight} KG</span>
                              )}
                            </Flex>
                          </Flex>
                        </div>
                      </div>
                    )}

                    <div className="product-details-desription">
                      <h2>Description</h2>
                      <p>{product?.description}</p>
                    </div>
                  </div>
                </div>
                <div className="product-details-right">
                  <div className="price-container">
                    <div className="mb-30">
                      <h3>Price</h3>
                      <Flex align="center" justify="space-between">
                        <span>PKR. {product?.price}</span>

                        <span>
                          Stock {product?.stock} {product?.unit}
                        </span>
                      </Flex>
                      <Flex align="center" gap={10}>
                        <ReactStars
                          count={5}
                          size={24}
                          value={product?.ratings}
                          color2={"#ffd700"}
                        />
                        <span style={{ color: "#808080" }}>
                          {" "}
                          ({product?.numOfReviews || 0})
                        </span>
                      </Flex>
                    </div>

                    <div className="whatsapp mb-40">
                      <button>
                        <Flex align="center" gap={15}>
                          <FaWhatsapp /> WhatsApp
                        </Flex>{" "}
                      </button>
                    </div>
                    <div className="buy-btn">
                      {product?.parent_category === "1" ? (
                        <button
                          disabled={product?.isSold}
                          style={{
                            background: `${product?.isSold ? "red" : ""}`,
                          }}
                          className="mb-30"
                          onClick={() => {
                            setOrderPopup(true);
                          }}
                        >
                          <Flex align="center" justify="center">
                            {product?.isSold ? "Sold" : `Purchase`}
                          </Flex>
                        </button>
                      ) : (
                        <button
                          disabled={parseInt(product?.stock) <= 0}
                          style={{
                            background: `${
                              parseInt(product?.stock) <= 0 ? "red" : ""
                            }`,
                          }}
                          className="mb-30"
                          onClick={() => {
                            setOrderPopup(true);
                          }}
                        >
                          <Flex align="center" justify="center">
                            {parseInt(product?.stock) <= 0
                              ? "Out of stock"
                              : `Purchase`}
                          </Flex>
                        </button>
                      )}

                      <div className="mb-30">
                        <h3 className="mb-20">Product Owner Details</h3>
                        <span>Name. {product?.createdBy?.name}</span>
                        <br />
                        <span>Email. {product?.createdBy?.email}</span>
                        <br />
                        <span>Phone. {product?.createdBy?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>,
              <GlobalErrorHandler label={getError} />
            )
          )}
        </div>
      </div>

      <Footer />

      {orderPopup && (
        <Popup
          className="complete-order-popup"
          popUp={orderPopup}
          setPopUp={setOrderPopup}
        >
          <form
            onSubmit={handleSubmit((values) => {
              if (!user?.token) {
                navigate("/login");
              } else {
                if (parseInt(values.quantity) > parseInt(product.stock)) {
                  toast.error("Stock not available");
                } else {
                  dispatch(
                    createOrder({
                      token: user?.token,
                      data: {
                        user_id: user?.user?._id,
                        farmer_id: product?.createdBy?._id,
                        product_id: product?._id,
                        address: values.address,
                        quantity: values?.quantity || undefined,
                      },
                    })
                  );
                }
              }
            })}
          >
            <Flex
              className={`global-input-container mb-20`}
              direction="column"
              gap={10}
            >
              <label htmlFor="address">Enter Your Address*</label>
              <div className="global-input-container-input global-input-container-input-with-image">
                <input
                  type={"text"}
                  placeholder={"Please enter your address"}
                  {...register("address", {
                    required: "Please Enter Your Address",
                    maxLength: {
                      value: 20,
                      message: "Should not be greater then characters",
                    },
                  })}
                  style={{ background: "#fff", width: "100%" }}
                  id="address"
                />
              </div>
              {errors?.address && (
                <p className="global-input-error">{errors?.address?.message}</p>
              )}
            </Flex>
            {product?.parent_category === "0" && (
              <Flex
                className={`global-input-container mb-20`}
                direction="column"
                gap={10}
              >
                <label htmlFor="quantity">Quantity in ({product?.unit})*</label>
                <div className="global-input-container-input global-input-container-input-with-image">
                  <input
                    type={"text"}
                    placeholder={"Please Enter quantity you want to order"}
                    {...register("quantity", {
                      required: false,
                      maxLength: {
                        value: 5,
                        message: "Should not be greater then 5 characters",
                      },
                    })}
                    style={{ background: "#fff", width: "100%" }}
                    id="quantity"
                  />
                </div>
                {errors?.quantity && (
                  <p className="global-input-error">
                    {errors?.quantity?.message}
                  </p>
                )}
              </Flex>
            )}
            <Flex align="center" justify="flex-end">
              <Button
                label="Add Order"
                type="submit"
                loading={addLoading}
                loaderColor="#fff"
              />
            </Flex>
          </form>
        </Popup>
      )}

      {addRetingPopup && (
        <Popup
          className="add-review-popup"
          popUp={addRetingPopup}
          setPopUp={setAddRatingPopup}
        >
          <h3 className="mb-20">Rate the product</h3>

          <ReactStars
            count={5}
            value={selectedRating}
            onChange={(e) => {
              setSelectedRating(e);
            }}
          />
          <div className="mb-20"></div>
          <Flex align="center" justify="flex-end" gap={10}>
            <Button
              label="Cancel"
              handleClick={() => setAddRatingPopup(false)}
            />
            <Button
              label="Submit"
              handleClick={() => {
                if (!user?.token) {
                  navigate("/login");
                } else {
                  dispatch(
                    createProductReview({
                      data: {
                        rating: selectedRating,
                        user_id: user?.user?._id,
                      },
                      id,
                    })
                  );
                }
              }}
              loaderColor={"#fff"}
              loading={addRatingLoading}
            />
          </Flex>
        </Popup>
      )}
    </div>
  );
};

export default ProductDetails;
