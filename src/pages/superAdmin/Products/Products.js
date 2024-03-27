import React, { useEffect, useState } from "react";
import Tabs from "../../../components/styled/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  clearState,
  updateProduct,
  getProductsForAdmin,
} from "../../../features/products/products";
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
import Flex from "../../../components/styled/Flex/Flex";
import { Edit, Trash2 } from "react-feather";
import Swal from "sweetalert2";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import GlobalErrorHandler from "../../../components/styled/GlobalErrorHandler/GlobalErrorHandler";
import Popup from "../../../components/styled/Popup/Popup";
import GlobalDropDown from "../../../components/styled/Form/GlobalDropDown/GlobalDropDown";
import "./style.css";
import Button from "../../../components/styled/Button/Button";
import { toast } from "react-toastify";
import { StatusBadge } from "../../sellerDashboard/Products/Products";
const Products = () => {
  const [selectedTab, setSelectedTab] = useState("All");

  const {
    loading,
    error,
    products,
    updateError,
    updateLoading,
    updateSuccess,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductsForAdmin({ status: selectedTab }));
    if (updateSuccess) {
      toast.success("Product updated successfully", {
        position: "top-right",
      });
      dispatch(clearState());
      setPopup(false);
    }
  }, [dispatch, selectedTab, updateSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError, {
        position: "top-right",
      });
      dispatch(clearState());
      setPopup(false);
    }
  }, [updateError, dispatch]);

  const [popup, setPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  return (
    <div style={{position:'relative'}}>
      <h1 className="mb-30">Products</h1>

      <Tabs
        setActiveOption={setSelectedTab}
        activeOption={selectedTab}
        options={["All","Pending", "Approved"]}
      />

      <div className="mb-30"></div>

      {conditionalRender(
        loading,
        <PageLoader />,
        conditionalRender(
          !error,
          <Table>
            <TableHead>
              <TableRow isHead={true}>
                <TableHeadData>
                  Name
                </TableHeadData>
                <TableHeadData>
                  Price
                </TableHeadData>
                <TableHeadData>
                 Image
                </TableHeadData>
                <TableHeadData>
                  Category
                </TableHeadData>
                <TableHeadData>
                  Status
                </TableHeadData>
                {selectedTab === "Processed" && (
                  <TableHeadData>
                    Stock
                  </TableHeadData>
                )}
                <TableHeadData>
                  Actions
                </TableHeadData>
              </TableRow>
            </TableHead>
            {conditionalRender(
              products?.length > 0,
              <TableBody>
                {products?.map((item, index) => {
                  return (
                    <TableRow key={index} index={index} isHead={false}>
                      <TableBodyData>
                        <TableText>{item?.name}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>RS. {item?.price}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>
                          {
                            <img
                              src={item?.image}
                              alt={item?.name}
                              height={40}
                              width={40}
                            />
                          }
                        </TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{item?.category}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align='center' justify='center'>
                          <StatusBadge label={item?.status}/>
                        </Flex>
                      </TableBodyData>
                      {selectedTab === "Processed" && (
                        <TableBodyData>
                          <TableText>{item?.stock}</TableText>
                        </TableBodyData>
                      )}
                      <TableBodyData>
                        <Flex align="center" justify="center" gap={10}>
                          <Edit
                            onClick={() => {
                              setUpdateId(item?._id);
                              setPopup(true);
                            }}
                            cursor="pointer"
                          />
                        </Flex>
                      </TableBodyData>
                    </TableRow>
                  );
                })}
              </TableBody>,
              <GlobalEmptyDataHandler label="No products to show" />
            )}
          </Table>,
          <GlobalErrorHandler label={error} />
        )
      )}

      {popup && (
        <Popup
          popUp={popup}
          setPopUp={setPopup}
          className="update-product-popup"
        >
          <div className={`mb-30`}>
            <GlobalDropDown
              label="Update Status*"
              stateHandler={selectedStatus}
              setStateHandler={setSelectedStatus}
              options={[
                { name: "Approve", value: "approved" },
                { name: "Pending", value: "pending" },
              ]}
              background="#fff"
            />
          </div>
          <Flex align="center" justify="flex-end" gap={10}>
            <Button
              label="Cancel"
              variant="outline"
              handleClick={() => setPopup(false)}
            />
            <Button
              label="Save"
              loading={updateLoading}
              handleClick={() => {
                if (selectedStatus) {
                  dispatch(
                    updateProduct({
                      id: updateId,
                      data: { status: selectedStatus.value },
                    })
                  );
                }
              }}
            />
          </Flex>
        </Popup>
      )}
    </div>
  );
};

export default Products;
