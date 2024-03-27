import React, { useEffect, useState } from "react";
import Tabs from "../../../components/styled/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import { conditionalRender } from "../../../utills/conditionalRender";
import PageLoader from "../../../components/styled/PageLoader/PageLoader";
import GlobalEmptyDataHandler from "../../../components/styled/GlobalEmptyDataHandler/GlobalEmptyDataHandler";
import { Table, TableBody, TableBodyData, TableHead, TableHeadData, TableRow, TableText } from "../../../components/styled/Table/Table";
import { clearState, deleteUser, getAllUsers } from "../../../features/sellerDashboard/usersSlice";
import Flex from "../../../components/styled/Flex/Flex";
import { AlertTriangle, Trash2 } from "react-feather";
import BtnLoader from "../../../components/styled/BtnLoader/BtnLoader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Users = () => {
  const [activeTab, setActiveTab] = useState("All");
  const {loading,error,users,delLoading,delError,delSuccess} = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllUsers({query:{role:activeTab}}))
    if(delSuccess){
      toast.success("User deleted successfully")
      dispatch(clearState())
    }
  },[dispatch,activeTab,delSuccess])
  useEffect(()=>{
    if(delError){
      toast.error(delError)
      dispatch(clearState())
    }
  },[delError,dispatch])
  return (
    <div className="users-container" style={{position:'relative'}}>
      <h1 className="mb-30">Users</h1>

      <Tabs
        setActiveOption={setActiveTab}
        activeOption={activeTab}
        options={["All", "Buyers", "Sellers"]}
      />
      <div className="mb-30">

      </div>
      {
        conditionalRender(loading,<PageLoader/>,conditionalRender(!error,
          conditionalRender(users?.length>0,
            <Table>
              <TableHead>
              <TableRow isHead={true}>
                <TableHeadData>
                  Name
                </TableHeadData>
                <TableHeadData>
                  Phone
                </TableHeadData>
                <TableHeadData>
                  Email
                </TableHeadData>
                <TableHeadData>
                  Address
                </TableHeadData>
                <TableHeadData>
                  Role
                </TableHeadData>
                <TableHeadData>
                  Actions
                </TableHeadData>
              </TableRow>
              </TableHead>
              <TableBody>
                {
                  users?.map((item,index)=>{
                    return <TableRow key={index} index={index} isHead={false}>
                      <TableBodyData><TableText>{item?.name}</TableText></TableBodyData>
                      <TableBodyData><TableText>{item?.phone}</TableText></TableBodyData>
                      <TableBodyData><TableText>{item?.email}</TableText></TableBodyData>
                      <TableBodyData><TableText>{item?.address}</TableText></TableBodyData>
                      <TableBodyData>
                        <Flex align='center' justify='center'>
                          <RoleBadge label={item?.role}/>
                        </Flex>
                      </TableBodyData>
                      <TableBodyData>
                        <Flex align='center' justify='center'>
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
                                    deleteUser({
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
                  })
                }
              </TableBody>
            </Table>
            ,<GlobalEmptyDataHandler label="No users to show"/>)
          ,<h1>{error}</h1>))
      }

    </div>
  );
};

 const RoleBadge = ({ label }) => {
  if (label === "user") {
    return <Flex className="badge-pending" align='center' justify='center'>buyer</Flex>;
  }
  if(label === 'farmer'){
    return <Flex className="badge-approved" align='center' justify='center'>seller</Flex>;
  }
  else{
    return null
  }
};
export default Users;
