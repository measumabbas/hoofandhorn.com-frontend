import React, { useEffect, useState } from "react";
import HomeSlider from "../components/HomeSlider/HomeSlider";
import Product from "../components/ProductBox/Product";
import ProductB from "../components/ProductBox/ProductB";
import ProductC from "../components/ProductBox/ProductC";
import ProductD from "../components/ProductBox/ProductD";
import ProductE from "../components/ProductBox/ProductE";
import ProductF from "../components/ProductBox/ProductF";
import ServicesSlider from "../components/HomeSlider/ServicesSlider";
import ExploreProducts from "../components/HomeSlider/ExploreProducts";
import Video from "../components/ProductBox/Video";
import ProductBlog from "../components/ProductBox/ProductBlog";
import GetApp from "./About/GetApp";
import Content from "./About/Content";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/products";
import { IoLocationOutline } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import { conditionalRender } from "../utills/conditionalRender";
import PageLoader from "../components/styled/PageLoader/PageLoader";
import GlobalErrorHandler from "../components/styled/GlobalErrorHandler/GlobalErrorHandler";
import GlobalEmptyDataHandler from "../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import { timeDifference } from "../utills/prettifyDate";
import { Link } from "react-router-dom";
import "./home.css";
import Flex from "../components/styled/Flex/Flex";
import { useForm } from "react-hook-form";
import Button from "../components/styled/Button/Button";
import { toast } from "react-toastify";
import { clearState, doctorRequest } from "../features/sellerDashboard/doctorsSlice";
import ReactStars from 'react-stars'
const Home = () => {
  const { loading, error, homeProducts } = useSelector(
    (state) => state.products
  );
  const [category, setCategory] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts({ category }));
  }, [dispatch, category]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {addLoading,addError,addSuccess} = useSelector(state => state.doctor)
  useEffect(()=>{
    if(addSuccess){
      toast.success("Requested Successfully",{
        position:'top-right'
      })
      dispatch(clearState())
    }
    if(addError){
      toast.error("Error occured while requesting",{
        position:'top-right'
      })
      dispatch(clearState())
    }
  },[addSuccess,addError,dispatch])
  return (
    <>
      <Navbar />
      <div className="container">
        <HomeSlider setCategory={setCategory} />
        <div className="product-outer-div">
          <div className="product-list-header">
            <h4>Products</h4>
          </div>
          <div className="product-list-outer">
            {conditionalRender(
              loading,
              <PageLoader />,
              conditionalRender(
                !error,
                conditionalRender(
                  homeProducts?.length > 0,
                  homeProducts?.map((item, index) => {
                    return (
                      <Link to={`/product/${item?._id}`}>
                        <div className="animal-product-list">
                          <div className="product-image">
                            <img src={item?.image} alt="" />
                          </div>
                          <div className="product-details-price">
                            <div className="animal-name-des">
                              <h3>{item?.name}</h3>
                              <Flex align='center' gap={10}>

                              <ReactStars count={5} size={24} value={item?.ratings} color2={'#ffd700'}/>
                              <span style={{color:'#808080'}}> ({item?.numOfReviews || 0})</span>
                              </Flex>
                            </div>
                            <div className="posted-place-animal">
                              <p>
                                Posted {timeDifference(item?.createdAt)} Ago
                              </p>

                              <h5>RS {item?.price}</h5>
                            </div>
                            <p style={{ color: "#666666" }}>{item?.category}</p>
                            <div className="location-view">
                              <div className="location-icon-place">
                                <IoLocationOutline color="#666666" />
                                <p style={{ color: "#666666" }}>
                                  {item?.createdBy?.address}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  }),
                  <div style={{ height: "40vh" }}>
                    <GlobalEmptyDataHandler label="No Products to show currently" />
                  </div>
                ),
                <GlobalErrorHandler label={error} />
              )
            )}
          </div>
        </div>
        {/* <Video /> */}
        <ProductBlog />
        <div>
          <div className="doctor-request" style={{ background: "#FDF2DE" }}>
            <div className="doctor-request-inner">
            <h1 className="mb-20">Join us as a doctor</h1>
              <form onSubmit={handleSubmit((values)=>{
                dispatch(doctorRequest({data: values}))
              })}>
                <Flex gap={30} className='mb-20'>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your Name"
                  />
                <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                  />
                  
                <input
                    type="text"
                    {...register("field")}
                    placeholder="Enter your Field"
                  />
                 
                  
                </Flex>
                <Flex align='center' justify='flex-end'>

                <Button label="Join Now" type="submit" loading={addLoading} loaderColor="#fff"/>
                </Flex>
              </form>
            </div>
          </div>
        </div>
        {/* <Content /> */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
