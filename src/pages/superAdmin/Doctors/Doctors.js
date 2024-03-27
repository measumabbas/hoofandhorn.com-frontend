import React, { useEffect, useState } from "react";
import Tabs from "../../../components/styled/Tabs/Tabs";
import {
  Table,
  TableBody,
  TableBodyData,
  TableHead,
  TableHeadData,
  TableRow,
  TableText,
} from "../../../components/styled/Table/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  deleteDoctor,
  getAllDoctors,
  updateDoctor,
} from "../../../features/sellerDashboard/doctorsSlice";
import { conditionalRender } from "../../../utills/conditionalRender";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import Flex from "../../../components/styled/Flex/Flex";
import { Edit, Trash2 } from "react-feather";
import Popup from "../../../components/styled/Popup/Popup";
import GlobalDropDown from "../../../components/styled/Form/GlobalDropDown/GlobalDropDown";
import Button from "../../../components/styled/Button/Button";
import Swal from "sweetalert2";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
import { toast } from "react-toastify";
import { StatusBadge } from "../../sellerDashboard/Products/Products";

const Doctors = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const dispatch = useDispatch();
  const {
    loading,
    error,
    doctors,
    updateError,
    updateLoading,
    updateSuccess,
    delLoading,
    delError,
    delSuccess,
  } = useSelector((state) => state.doctor);

  useEffect(() => {
    dispatch(getAllDoctors({ query: { status: activeTab } }));
    if(updateSuccess || delSuccess){
      toast.success("Operation successfull",{
        position:'top-right'
      })
      dispatch(clearState())
    }
  }, [dispatch, activeTab,updateSuccess,delSuccess]);


  useEffect(()=>{
    if(delError || updateError){
      toast.error("Some Error occured",{
        position:'top-right'
      })
      dispatch(clearState())
      setPopup(false)
    }
  },[delError,updateError,dispatch])

  const [popup, setPopup] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  return (
    <div className="doctors-conteiner" style={{position:'relative'}}>
      <h1 style={{marginBottom:'40px'}}>Doctors</h1>
      <Tabs
        activeOption={activeTab}
        setActiveOption={setActiveTab}
        options={["Pending", "Approved"]}
      />

      {conditionalRender(
        loading,
        <PageLoader />,
        conditionalRender(
          !error,
          conditionalRender(
            doctors?.length > 0,
            <Table>
              <TableHead>
                <TableRow isHead={true}>
                  <TableHeadData>Name</TableHeadData>
                  <TableHeadData>Email</TableHeadData>
                  <TableHeadData>Field</TableHeadData>
                  <TableHeadData>Status</TableHeadData>
                  <TableHeadData>Actions</TableHeadData>
                </TableRow>
              </TableHead>
              <TableBody>
                {doctors?.map((item, index) => {
                  return (
                    <TableRow key={index} index={index} isHead={false}>
                      <TableBodyData>
                        <TableText>{item?.name}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{item?.email}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <TableText>{item?.field}</TableText>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align='center' justify='center'>
                          <StatusBadge label={item?.status}/>
                        </Flex>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align="center" justify="center" gap={10}>
                          <Edit
                            onClick={() => {
                              setUpdateId(item?._id);
                              setPopup(true);
                            }}
                            cursor="pointer"
                          />
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
                                    deleteDoctor({
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
            <GlobalEmptyDataHandler label="No Doctors to show" />
          ),
          <h1>{error}</h1>
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
              background="#f4f4f4"
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
                    updateDoctor({
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

export default Doctors;
