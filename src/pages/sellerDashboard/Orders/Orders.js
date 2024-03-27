import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteOrder,
  getAllOrders,
  updateOrder,
} from "../../../features/sellerDashboard/orderSlice";
import Flex from "../../../components/styled/Flex/Flex";
import { Link } from "react-router-dom";
import Button from "../../../components/styled/Button/Button";
import { conditionalRender } from "../../../utills/conditionalRender";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import {
  Table,
  TableBody,
  TableBodyData,
  TableHead,
  TableHeadData,
  TableRow,
  TableText,
} from "../../../components/styled/Table/Table";
import { Edit, Trash2 } from "react-feather";
import Swal from "sweetalert2";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import GlobalErrorHandler from "../../../components/styled/GlobalErrorHandler/GlobalErrorHandler";
import { toast } from "react-toastify";
import Popup from "../../../components/styled/Popup/Popup";
import GlobalDropDown from "../../../components/styled/Form/GlobalDropDown/GlobalDropDown";
import Tabs from "../../../components/styled/Tabs/Tabs";
import { StatusBadge } from "../Products/Products";
const Orders = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Livestock");
  const {
    loading,
    orders,
    error,
    delLoading,
    delError,
    delSuccess,
    updateLoading,
    updateError,
    updateSuccess,
  } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.token) {
      dispatch(
        getAllOrders({ token: user?.token, query: { category: activeTab } })
      );
    }
    if (delSuccess) {
      toast.success("Order deleted successfully", {
        position: "top-right",
      });
      dispatch(clearState());
    }
    if (updateSuccess) {
      toast.success("Order updated successfully", {
        position: "top-right",
      });
      dispatch(clearState());
      setUpdatePopup(false);
    }
  }, [user, dispatch, delSuccess, updateSuccess, activeTab]);

  useEffect(() => {
    if (delError) {
      toast.error(delError, {
        position: "top-right",
      });
      dispatch(clearState());
    }
    if (updateError) {
      toast.error(updateError, {
        position: "top-right",
      });
      dispatch(clearState());
      setUpdatePopup(false);
    }
  }, [delError, dispatch, updateError]);
  const [updatePopup, setUpdatePopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [productId, setProductId] = useState(null);

  const updateTheOrder = () => {
    dispatch(
      updateOrder({
        token: user?.token,
        data: {
          status: selectedStatus.value,
          product_id: productId,
        },
        id: updateId,
      })
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <Flex align="center" justify="space-between" className="mb-20">
        <h1 className="dashboard-main-heading">Orders</h1>
        {/* <Link to="/seller/create-product">
          <Button label="Create Product" />
        </Link> */}
      </Flex>

      <Tabs
        activeOption={activeTab}
        setActiveOption={setActiveTab}
        options={["Livestock","Poultry", "Processed"]}
      />

      {conditionalRender(
        loading,
        <PageLoader />,
        conditionalRender(
          !error,
          <Table>
            <TableHead>
              <TableRow isHead={true}>
                <TableHeadData>Product Name</TableHeadData>
                <TableHeadData>Price</TableHeadData>
                <TableHeadData>Category</TableHeadData>
                <TableHeadData>Ordered By</TableHeadData>
                {activeTab === "Processed" && (
                  <TableHeadData>Ordered Quantity</TableHeadData>
                )}
                {activeTab === "Processed" && (
                  <TableHeadData>Available Stock</TableHeadData>
                )}

                <TableHeadData>Address</TableHeadData>
                <TableHeadData>Status</TableHeadData>
                <TableHeadData>Actions</TableHeadData>
              </TableRow>
            </TableHead>
            {conditionalRender(
              orders?.length > 0,
              <TableBody>
                {orders?.map((item, index) => {
                  return (
                    <TableRow key={index} index={index} isHead={false}>
                      <TableBodyData>
                        <TableText>{item?.product_id?.name}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>RS. {item?.product_id?.price}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{item?.product_id?.category}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{item?.user_id?.name}</TableText>
                      </TableBodyData>
                      {activeTab === "Processed" && (
                        <TableBodyData>
                          <TableText>
                            {item?.quantity} {item?.product_id?.unit}
                          </TableText>
                        </TableBodyData>
                      )}

                      {activeTab === "Processed" && (
                        <TableBodyData>
                          <TableText>
                            {item?.product_id?.stock} {item?.product_id?.unit}
                          </TableText>
                        </TableBodyData>
                      )}

                      <TableBodyData>
                        <TableText>{item?.address}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align="center" justify="center">
                          <StatusBadge label={item?.status} />
                        </Flex>
                      </TableBodyData>

                      <TableBodyData>
                        <Flex align="center" justify="center" gap={10}>
                          <Edit
                            onClick={() => {
                              setUpdateId(item?._id);
                              setProductId(item?.product_id?._id);
                              console.log(productId);
                              setUpdatePopup(true);
                            }}
                            cursor="pointer"
                          />
                          <Trash2
                            cursor="pointer"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: `${
                                  delLoading ? (
                                    <BtnLoader color="#fff" />
                                  ) : (
                                    "Delete"
                                  )
                                }`,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(
                                    deleteOrder({
                                      token: user?.token,
                                      id: item?._id,
                                    })
                                  );
                                }
                              });
                            }}
                          />
                        </Flex>
                      </TableBodyData>
                    </TableRow>
                  );
                })}
              </TableBody>,
              <GlobalEmptyDataHandler label="No orders to show" />
            )}
          </Table>,
          <GlobalErrorHandler label={error} />
        )
      )}
      {updatePopup && (
        <Popup
          popUp={updatePopup}
          setPopUp={setUpdatePopup}
          className="update-order-status-popup"
        >
          <div className={`global-outer-input-popup mb-20`}>
            <GlobalDropDown
              label="Select Category*"
              stateHandler={selectedStatus}
              setStateHandler={setSelectedStatus}
              options={[
                { name: "Pending", value: "pending" },
                { name: "Delivered", value: "delivered" },
                { name: "Cancelled", value: "cancelled" },
              ]}
              background="#f4f4f4"
            />
          </div>
          <Flex align="center" justify="flex-end" gap={10}>
            <Button
              label="cencel"
              variant="outline"
              handleClick={() => setUpdatePopup(false)}
            />
            <Button
              label="Save"
              loading={updateLoading}
              loaderColor="#fff"
              handleClick={updateTheOrder}
            />
          </Flex>
        </Popup>
      )}
    </div>
  );
};

export default Orders;
