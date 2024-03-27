import React, { useEffect, useState } from "react";
import "./style.css";
import Flex from "../../../components/styled/Flex/Flex";
import Button from "../../../components/styled/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
    clearState,
  createConsultation,
  deleteConsultation,
  getUserConsultations,
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
import { StatusBadge } from "../Products/Products";
import Popup from "../../../components/styled/Popup/Popup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Tabs from "../../../components/styled/Tabs/Tabs";
import Swal from "sweetalert2";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
const Consultation = () => {
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
  const [activeTab,setActiveTab] = useState("All")
  useEffect(() => {
    if (user?.token) {
      dispatch(getUserConsultations({ token: user?.token,query:{status:activeTab} }));
    }
    if(addSuccess){
        toast.success("Consultation requested successfully",{
            position:'top-right'
        })
        dispatch(clearState())
        setAddPopup(false)
    }
    if(delSuccess){
        toast.success("Consultation deleted successfully",{
            position:'top-right'
        })
        dispatch(clearState())
    }
  }, [user?.token, dispatch,addSuccess,activeTab,delSuccess]);

  useEffect(()=>{
    if(addError){
        toast.error(addError,{
            position:'top-right'
        })
        dispatch(clearState())
    }
    if(delError){
        toast.error(delError,{
            position:'top-right'
        })
        dispatch(clearState())
    }
  },[addError,dispatch,delError])
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

 
  const [addPopup,setAddPopup] = useState(false)
  return (
    <div className="consultations-container" style={{ position: "relative" }}>
      <Flex align="center" justify="space-between" className='mb-30'>
        <h1>Consultation Requests</h1>
        <Button label="Add Request" handleClick={()=> setAddPopup(true)}/>
      </Flex>

      <Tabs activeOption={activeTab} setActiveOption={setActiveTab} options={["All","Pending","Resolved"]}/>

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
                                    deleteConsultation({
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
              </TableBody>
            </Table>,
            <GlobalEmptyDataHandler label="No Consultations to show" />
          ),

          <h1>{error}</h1>
        )
      )}

      {addPopup && (
        <Popup className="add-consultation-popup" popUp={addPopup} setPopUp={setAddPopup}>
          <h2 className="mb-30">Request consultation with a message</h2>

          <form
            onSubmit={handleSubmit((values) => {
              dispatch(createConsultation({ token: user.token, data: values }));
            })}
          >
            <div
              className="lable-textarea-group lable-input-group mb-40"
              style={{ maxWidth: "900px" }}
            >
              <label htmlFor="message" className="mb-10">
                Message*
              </label>
              <div
                className="edit-client-icon-textarea"
                style={{ marginTop: "10px" }}
              >
                <textarea
                  name=""
                  id="message"
                  cols="135"
                  rows="3"
                  placeholder="Notes"
                  {...register("message", {
                    required: "Please Add message",
                  })}
                ></textarea>
              </div>
              <p className="global-input-error">
                {errors?.message && errors?.message?.message}
              </p>
            </div>

            <Flex align="center" justify="flex-end">
              <Button
                type="submit"
                label="Save"
                loading={addLoading}
                loaderColor="#fff"
              />
            </Flex>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default Consultation;
