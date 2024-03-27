import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../../components/styled/Flex/Flex";
import Button from "../../../components/styled/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  createConsultation,
  deleteConsultation,
  getConsultations,
  getUserConsultations,
  updateConsultation,
} from "../../../features/sellerDashboard/consultationSlice";
import { conditionalRender } from "../../../utills/conditionalRender";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import "./style.css";
import {
  Table,
  TableBody,
  TableBodyData,
  TableHead,
  TableHeadData,
  TableRow,
  TableText,
} from "../../../components/styled/Table/Table";
import { prettifyDate } from "../../../utills/prettifyDate";
import { Edit, Trash2 } from "react-feather";
import Popup from "../../../components/styled/Popup/Popup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Tabs from "../../../components/styled/Tabs/Tabs";
import Swal from "sweetalert2";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
import { StatusBadge } from "../../sellerDashboard/Products/Products";
import GlobalDropDown from "../../../components/styled/Form/GlobalDropDown/GlobalDropDown";
import GlobalErrorHandler from "../../../components/styled/GlobalErrorHandler/GlobalErrorHandler";
const AdminConsultation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    loading,
    error,
    consultations,
    addLoading,
    addError,
    addSuccess,
    delError,
    delSuccess,
    delLoading,
    updateError,
    updateLoading,
    updateSuccess,
  } = useSelector((state) => state.consultations);
  const [activeTab, setActiveTab] = useState("All");
  const [status, setStatus] = useState(null);
  useEffect(() => {
    if (user?.token) {
      dispatch(
        getConsultations({
          query: { status: activeTab },
        })
      );
    }
    if (updateSuccess) {
      toast.success("Consultation updated successfully", {
        position: "top-right",
      });
      dispatch(clearState());
      setAddPopup(false);
    }
    if (delSuccess) {
      toast.success("Consultation deleted successfully", {
        position: "top-right",
      });
      dispatch(clearState());
    }
  }, [user?.token, dispatch, updateSuccess, activeTab, delSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error(updateError, {
        position: "top-right",
      });
      dispatch(clearState());
    }
    if (delError) {
      toast.error(delError, {
        position: "top-right",
      });
      dispatch(clearState());
    }
  }, [updateError, dispatch, delError]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [addPopup, setAddPopup] = useState(false);
  return (
    <div className="consultations-container" style={{ position: "relative" }}>
      <Flex align="center" justify="space-between" className="mb-30">
        <h1>Consultation Requests</h1>
      </Flex>

      <Tabs
        activeOption={activeTab}
        setActiveOption={setActiveTab}
        options={["All", "Pending", "Resolved"]}
      />

      {conditionalRender(
        loading,
        <PageLoader />,
        conditionalRender(
          !error,
          conditionalRender(
            consultations?.length > 0,
            <Table>
              <TableHead>
                <TableRow isHead={true}>
                  <TableHeadData>Request by</TableHeadData>
                  <TableHeadData>Phone</TableHeadData>
                  <TableHeadData>Message</TableHeadData>
                  <TableHeadData>Date</TableHeadData>
                  <TableHeadData>Status</TableHeadData>
                  <TableHeadData>Actions</TableHeadData>
                </TableRow>
              </TableHead>

              <TableBody>
                {consultations?.map((item, index) => {
                  return (
                    <TableRow key={index} index={index} isHead={false}>
                      <TableBodyData className="consultation-message">
                        <TableText>{item?.user_id?.name}</TableText>
                      </TableBodyData>
                      <TableBodyData className="consultation-message">
                        <TableText>{item?.user_id?.phone}</TableText>
                      </TableBodyData>
                      <TableBodyData className="consultation-message">
                        <TableText>{item?.message}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{prettifyDate(item?.createdAt)}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align="center" justify="center">
                          <StatusBadge label={item?.status} />
                        </Flex>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align="center" justify="center" gap={10}>
                          {item?.status !== "resolved" && (
                            <Edit
                              cursor="pointer"
                              onClick={() => setAddPopup(item?._id)}
                            />
                          )}

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
                                cancelButtonText: "Cancel",
                                cancelButtonColor: "#2C3152",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  dispatch(
                                    deleteConsultation({
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
              </TableBody>
            </Table>,
            <GlobalEmptyDataHandler label="No Consultations to show" />
          ),

          <h1>{error}</h1>
        )
      )}

      {addPopup && (
        <Popup
          className="add-consultation-popup"
          popUp={status}
          setPopUp={setStatus}
        >
          <h2 className="mb-30">Update consultation status</h2>

          <form
            onSubmit={handleSubmit((values) => {
              if (status) {
                dispatch(
                  updateConsultation({
                    data: { status: status.value },
                    id: addPopup,
                  })
                );
              }
            })}
          >
            <div className="mb-30">
              <GlobalDropDown
                label="Status*"
                setStateHandler={setStatus}
                stateHandler={status}
                options={[
                  { name: "Resolved", value: "resolved" },
                  { name: "Pending", value: "pending" },
                ]}
              />
            </div>

            <Flex align="center" justify="flex-end">
              <Button
                type="submit"
                label="Save"
                loading={updateLoading}
                loaderColor="#fff"
              />
            </Flex>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default AdminConsultation;
