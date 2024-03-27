import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../../components/styled/Flex/Flex";
import { useForm } from "react-hook-form";
import GlobalDropDown from "../../../components/styled/Form/GlobalDropDown/GlobalDropDown";
import Button from "../../../components/styled/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearState, createProduct } from "../../../features/products/products";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [category, setCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImage, setShowImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { addLoading, addSuccess, addError } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Check if the file is an image
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();

        image.onload = () => {
          const { width, height } = image;
          const minWidth = 100;
          const minHeight = 100;
          const maxWidth = 1500;
          const maxHeight = 1500;
          if (
            width >= minWidth &&
            height >= minHeight &&
            width <= maxWidth &&
            height <= maxHeight
          ) {
            setSelectedImage(file);
            setShowImage(reader.result);
            setErrorMessage("");
          } else {
            setErrorMessage(
              "Image size is not within the allowed limits(100-701 x 100-445). Please choose an image with appropriate dimensions."
            );
            setSelectedImage(null);
            setShowImage(null);
          }
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    } else {
      setErrorMessage("Please select an image");
    }
  };

  const [gender, setSelectedGender] = useState(null);
  const [subCategory, setSelectedSubCategory] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleCreateProduct = (values) => {
    if (category) {
      const apiData = new FormData();
      apiData.append("name", values.name);
      apiData.append("price", values.price);
      apiData.append("description", values.description);
      if (category?.name === "Livestock") {
        apiData.append("parent_category", 1);
      } else if(category?.name === "Poultry"){
        apiData.append("parent_category", 2);
      }else{
        apiData.append("parent_category", 0);
      }
      if (values?.stock) {
        apiData.append("stock", values.stock);
      }
      apiData.append("category", subCategory.value);
      apiData.append("image", showImage);
      if (values?.age) {
        apiData.append("age", values.age);
      }
      if (values?.weight) {
        apiData.append("weight", values.weight);
      }
      if (gender) {
        apiData.append("gender", gender.value);
      }
      if (unit) {
        apiData.append("unit", unit.value);
      }
      dispatch(createProduct({ token: user?.token, data: apiData }));
    }
  };

  useEffect(() => {
    if (addSuccess) {
      dispatch(clearState());
      navigate("/seller/products");
    }
    if (addError) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: addError,
        showConfirmButton: true,
      });
      dispatch(clearState());
    }
  }, [addError, addSuccess, dispatch, navigate]);

  const [unit, setSelectedUnit] = useState(null);
  return (
    <div>
      <h1 className="dashboard-main-heading mb-30">Create Product</h1>
      <form onSubmit={handleSubmit(handleCreateProduct)}>
        <div className="global-outer-inputs mb-30">
          <Flex
            className={`global-input-container global-outer-input`}
            direction="column"
            gap={10}
          >
            <label htmlFor="name">Product Name*</label>
            <div className="global-input-container-input global-input-container-input-with-image">
              <input
                type={"text"}
                placeholder={"Product Name"}
                {...register("name", {
                  required: "Please Enter Product Name",
                  maxLength: {
                    value: 20,
                    message: "Should not be greater then characters",
                  },
                })}
                id="name"
              />
            </div>
            {errors?.name && (
              <p className="global-input-error">{errors?.name?.message}</p>
            )}
          </Flex>
          <Flex
            className={`global-input-container global-outer-input`}
            direction="column"
            gap={10}
          >
            <label htmlFor="price">Price*</label>
            <div className="global-input-container-input global-input-container-input-with-image">
              <input
                type={"number"}
                placeholder={"Product Price"}
                {...register("price", {
                  required: "Please Enter Price",
                  maxLength: {
                    value: 10,
                    message: "Should not be greater then  10 characters",
                  },
                })}
                id="price"
              />
            </div>
            {errors?.price && (
              <p className="global-input-error">{errors?.price?.message}</p>
            )}
          </Flex>
          <div className={`global-outer-input`}>
            <GlobalDropDown
              label="Select Category*"
              stateHandler={category}
              setStateHandler={setCategory}
              options={[
                { name: "Livestock", value: "cow" },
                { name: "Poultry", value: "hen" },
                { name: "Processed", value: "sheep" },
              ]}
              background="#fff"
            />
          </div>

          {category &&
            (category?.name === "Livestock" ||
              category?.name === "Poultry") && (
              <>
                <Flex
                  className={`global-input-container global-outer-input`}
                  direction="column"
                  gap={10}
                >
                  <label htmlFor="age">Age (In Years)*</label>
                  <div className="global-input-container-input global-input-container-input-with-image">
                    <input
                      type={"number"}
                      placeholder={"Age"}
                      {...register("age", {
                        required: "Please Enter Age",
                        maxLength: {
                          value: 3,
                          message: "Should not be greater then  3 characters",
                        },
                      })}
                      id="age"
                    />
                  </div>
                  {errors?.age && (
                    <p className="global-input-error">{errors?.age?.message}</p>
                  )}
                </Flex>
                <div className={`global-outer-input`}>
                  <GlobalDropDown
                    label="Select Gender*"
                    stateHandler={gender}
                    setStateHandler={setSelectedGender}
                    options={[
                      { name: "Male", value: "Male" },
                      { name: "Female", value: "Female" },
                    ]}
                    background="#fff"
                  />
                </div>
                <Flex
                  className={`global-input-container global-outer-input`}
                  direction="column"
                  gap={10}
                >
                  <label htmlFor="weight">Weight (In KG)*</label>
                  <div className="global-input-container-input global-input-container-input-with-image">
                    <input
                      type={"number"}
                      placeholder={"Weight"}
                      {...register("weight", {
                        required: "Please Enter Weight",
                        maxLength: {
                          value: 5,
                          message: "Should not be greater then  5 characters",
                        },
                      })}
                      id="weight"
                    />
                  </div>
                  {errors?.weight && (
                    <p className="global-input-error">
                      {errors?.weight?.message}
                    </p>
                  )}
                </Flex>
              </>
            )}
        </div>
        <Flex align="center" gap={10} className="mb-20">
          {category && (
            <>
              <div className={`global-outer-input`}>
                <GlobalDropDown
                  label="Select Sub Category*"
                  stateHandler={subCategory}
                  setStateHandler={setSelectedSubCategory}
                  options={
                    category?.name === "Livestock"
                      ? [
                          { name: "Goat", value: "goat" },
                          { name: "Donkey", value: "donkey" },
                          { name: "Horse", value: "horse" },
                          { name: "Cow", value: "cow" },
                          { name: "Sheep", value: "sheep" },
                        ]
                      : category?.name === "Poultry"
                      ? [
                          { name: "Chicken", value: "chicken" },
                          { name: "Hen", value: "hen" },
                        ]
                      : [
                          { name: "Milk", value: "milk" },
                          { name: "Butter", value: "butter" },
                          { name: "Cheese", value: "cheese" },
                          { name: "Yogurt", value: "yogurt" },
                        ]
                  }
                  background="#fff"
                />
              </div>
            </>
          )}
          {category && category?.name === "Processed" && (
            <>
              <div className={`global-outer-input`}>
                <GlobalDropDown
                  label="Select Sub Measuring Unit*"
                  stateHandler={unit}
                  setStateHandler={setSelectedUnit}
                  options={[
                    { name: "Kilo Grams", value: "KG" },
                    { name: "Liters", value: "LTR" },
                  ]}
                  background="#fff"
                />
              </div>

              {unit && (
                <Flex
                  className={`global-input-container global-outer-input`}
                  direction="column"
                  gap={10}
                >
                  <label htmlFor="stock">
                    Stock (In {unit?.value === "KG" ? "KG" : "LTRs"})*
                  </label>
                  <div className="global-input-container-input global-input-container-input-with-image">
                    <input
                      type={"number"}
                      placeholder={"Weight"}
                      {...register("stock", {
                        required: false,
                        maxLength: {
                          value: 5,
                          message: "Should not be greater then  5 characters",
                        },
                      })}
                      id="weight"
                    />
                  </div>
                </Flex>
              )}
            </>
          )}
        </Flex>

        <div
          className="lable-textarea-group lable-input-group mb-40"
          style={{ maxWidth: "900px" }}
        >
          <label htmlFor="notes">Description*</label>
          <div className="edit-client-icon-textarea">
            <textarea
              name=""
              id="notes"
              cols="135"
              rows="3"
              placeholder="Notes"
              {...register("description", {
                required: "Please Add description",
              })}
            ></textarea>
          </div>
          <p className="global-input-error">
            {errors?.description && errors?.description?.message}
          </p>
        </div>
        <div className="upload-content-image-section mb-40" id="img-box">
          <label htmlFor="file">
            <div>
              {selectedImage ? (
                <div className="upload-img">
                  {/* <img src={selectedImage} alt="Preview" /> */}
                  {selectedImage && <img src={showImage} alt="Selected" />}
                </div>
              ) : (
                // <img src={uploadimg} alt="Preview" />
                <>
                  <div className="upload-photo">
                    <div className="up-img">
                      {/* <img src={uploadimg} alt="" /> */}
                      <span className="drag-drop" style={{color:'#000',fontFamily:'Inter'}}>Select Image</span>
                    </div>
                  </div>
                  {/* {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )} */}
                </>
              )}
            </div>
          </label>
          <input
            className="upload-content-image"
            type="file"
            accept="image/*"
            name="image"
            id="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="file" className="upload-content-label">
            Choose image
          </label>
        </div>

        <Flex align="center" gap={20}>
          <Button
            label="Create Product"
            type="submit"
            loading={addLoading}
            loaderColor="#fff"
          />
          <Button label="Cancel" variant="outline" />
        </Flex>
      </form>
    </div>
  );
};

export default CreateProduct;
