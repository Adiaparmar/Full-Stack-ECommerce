import { Button, Dialog, emphasize, styled } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { editData, fetchDataFromApi } from "../../utils/api";
import { MdClose } from "react-icons/md";

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [singleOrder, setSingleOrder] = useState();
  useEffect(() => {
    fetchDataFromApi("/api/orders?page=1&perPage=50").then((res) => {
      setOrders(res);
    });
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    fetchDataFromApi(`/api/orders?page=${value}&perPage=50`).then((res) => {
      setOrders(res);
    });
  };
  const showProducts = (id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      setIsOpenModal(true);
      setProducts(res.products);
    });
  };

  const orderStatus = (orderStatus, id) => {
    fetchDataFromApi(`/api/orders/${id}`).then((res) => {
      const order = {
        name: res.name,
        phone: res.phone,
        address: res.address,
        pinCode: res.pinCode,
        amount: res.amount,
        paymentId: res.paymentId,
        email: res.email,
        userId: res.userId,
        products: res.products,
        status: orderStatus,
      };
      editData(`/api/orders/${id}`, order).then((res) => {
        fetchDataFromApi("/api/orders?page=1&perPage=8").then((res) => {
          setOrders(res);
        });
      });
      setSingleOrder(res.products);
    });
  };
  return (
    <div className="right-content w-100">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0 ">Orders List</h5>

        <div className="ml-auto d-flex align-items-center">
          <Breadcrumbs aria-label="breadcrumb" className="ml-auto breadcrumbs_">
            <StyledBreadcrumb
              components="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb label="Orders" components="a" href="#" />
          </Breadcrumbs>
        </div>
      </div>

      <div className="table-responsive mt-3">
        <table className="table table-border v-align">
          <thead className="thead-dark">
            <tr>
              <th style={{ textAlign: "center" }}>Payment Id</th>
              <th style={{ textAlign: "center" }}>Products</th>
              <th style={{ width: "100px", textAlign: "center" }}>Name</th>
              <th style={{ textAlign: "center" }}>Phone number</th>
              <th style={{ textAlign: "center" }}>Address</th>
              <th style={{ textAlign: "center" }}>Pincode</th>
              <th style={{ textAlign: "center" }}>Total Amount</th>
              <th style={{ textAlign: "center" }}>Email</th>
              <th style={{ textAlign: "center" }}>User Id</th>
              <th style={{ textAlign: "center" }}>Order Status</th>
              <th style={{ textAlign: "center" }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {orders?.orderList?.length !== 0 &&
              orders?.orderList?.map((order, index) => {
                return (
                  <tr>
                    <td>
                      <span className="text-blue font-weight-bold">
                        {order?.paymentId}
                      </span>
                    </td>
                    <td>
                      <span
                        className="viewbtn text-blue font-weight-bold cursor-pointer"
                        onClick={() => showProducts(order._id)}
                      >
                        Click here to view
                      </span>
                    </td>
                    <td>{order?.name}</td>
                    <td>{order?.phone}</td>
                    <td>{order?.address}</td>
                    <td>{order?.pinCode}</td>
                    <td>{order?.amount}</td>
                    <td>{order?.email}</td>
                    <td>{order?.userId}</td>
                    <td>
                      {order?.status === "Pending" ? (
                        <span
                          className="badge badge-danger"
                          onClick={() => orderStatus("confirm", order?._id)}
                          style={{ color: "#fff" }}
                        >
                          {order?.status}
                        </span>
                      ) : (
                        <span
                          className="badge badge-success"
                          onClick={() => orderStatus("pending", order?._id)}
                          style={{ color: "#fff" }}
                        >
                          {order?.status}
                        </span>
                      )}
                    </td>
                    <td>{order?.date}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {orders?.ordersList?.totalPages > 1 && (
          <Pagination
            count={orders?.ordersList?.totalPages}
            color="primary"
            className="pagination"
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        )}
      </div>
      <Dialog open={isOpenModal} className="productModal dialogproduct">
        <div className="d-flex align-items-center justify-content-between mb-3 p-1">
          <h4 className=" font-weight-bold pr-5 ">Products</h4>
          <Button className="close" onClick={() => setIsOpenModal(false)}>
            <MdClose />
          </Button>
        </div>
        <div className="table-responsive orderTable">
          <table className="table table-bordered v-align table-striped">
            <thead className="thead-dark">
              <tr>
                <th style={{ textAlign: "center" }}>Product Id</th>
                <th style={{ textAlign: "center" }}>Product Title</th>
                <th style={{ textAlign: "center" }}>Product Image</th>

                <th style={{ textAlign: "center" }}>Quantity</th>
                <th style={{ textAlign: "center" }}>Price</th>
                <th style={{ textAlign: "center" }}>SubTotal</th>
              </tr>
            </thead>
            <tbody>
              {products?.length !== 0 &&
                products?.map((product, index) => {
                  return (
                    <tr>
                      <td>{product?._id}</td>
                      <td>{product?.productName}</td>
                      <td>
                        <div className="img">
                          <img src={product?.image} alt="" />
                        </div>
                      </td>
                      <td>{product?.quantity}</td>
                      <td>{product?.price}</td>
                      <td>{product?.total}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Dialog>
    </div>
  );
};
export default Orders;
