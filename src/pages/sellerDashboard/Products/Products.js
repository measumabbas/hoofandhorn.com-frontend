import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../../components/styled/Flex/Flex";
import Button from "../../../components/styled/Button/Button";
import {
  Table,
  TableBody,
  TableBodyData,
  TableHead,
  TableHeadData,
  TableRow,
  TableText,
} from "../../../components/styled/Table/Table";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { conditionalRender } from "../../../utills/conditionalRender";
import {
  clearState,
  deleteProduct,
  getSellerProducts,
} from "../../../features/products/products";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import GlobalErrorHandler from "../../../components/styled/GlobalErrorHandler/GlobalErrorHandler";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
import Swal from "sweetalert2";
import Tabs from "../../../components/styled/Tabs/Tabs";
import { toast } from "react-toastify";
const Products = () => {
  const { loading, error, products, delSuccess, delError, delLoading } =
    useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("Livestock");
  useEffect(() => {
    if (user?.token) {
      dispatch(getSellerProducts({ token: user?.token, query: selectedTab }));
    }
    if (delSuccess) {
      toast.success("Product deleted successfully")
      dispatch(clearState());
    }
  }, [dispatch, user?.token, delSuccess, selectedTab]);
  useEffect(() => {
    if (delError) {
      toast.error(delError)
      dispatch(clearState());
    }
  }, [delError, dispatch]);

  return (
    <div style={{ position: "relative" }}>
      <Flex align="center" justify="space-between" className="mb-40">
        <h1 className="dashboard-main-heading">Products</h1>
        <Flex>
          <Link to="/seller/create-product">
            <Button label="Create Product" />
          </Link>
        </Flex>
      </Flex>
      <Tabs
        setActiveOption={setSelectedTab}
        activeOption={selectedTab}
        options={["Livestock", "Poultry", "Processed"]}
      />

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
                          <TableText>
                            {item?.stock} {item?.unit}
                          </TableText>
                        </TableBodyData>
                      )}
                      <TableBodyData>
                        <Flex align="center" justify="center" gap={10}>
                          <Edit />
                          <Trash2
                            cursor="pointer"
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure you want to delete?",
                                text: "You won't be able to revert this!",
                                confirmButtonText: `${
                                  delLoading ? (
                                    <BtnLoader color="#fff" />
                                  ) : (
                                    "Delete"
                                  )
                                }`,
                                confirmButtonColor: "#C62E2E",
                                showCancelButton: true,
                                cancelButtonText:'Cancel',
                                cancelButtonColor: "#2C3152",
                                
                                
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(
                                    deleteProduct({
                                      token:user?.token,
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
              <GlobalEmptyDataHandler label="No products to show" />
            )}
          </Table>,
          <GlobalErrorHandler label={error} />
        )
      )}

      {/* <PageLoader/> */}
    </div>
  );
};

export const StatusBadge = ({ label }) => {
  if (label === "pending") {
    return <Flex className="badge-pending" align='center' justify='center'>{label}</Flex>;
  }
  if(label === 'approved' || label === 'delivered' || label === 'resolved'){
    return <Flex className="badge-approved" align='center' justify='center'>{label}</Flex>;
  }
  if(label === 'cancelled'){
    return <Flex className="badge-cancelled" align='center' justify='center'>{label}</Flex>;
  }
  else{
    return null
  }
};
export default Products;
