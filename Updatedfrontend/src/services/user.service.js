import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const ADMIN_URL="http://localhost:8080/api/v1/admin/";
const MANAGER_URL="http://localhost:8080/api/v1/manager/";
const USER_URL="http://localhost:8080/api/v1/customer/";


const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get( USER_URL, { headers: authHeader() });
};

const getManagerBoard = () => {
  return axios.get(MANAGER_URL, { headers: authHeader() });
};

const addproduct = (payload) => {
  console.log(authHeader());
  return axios.post(ADMIN_URL + "addproduct",payload, {
    headers: {
      ...authHeader(),
    }
     // Set the payload as params
  });
};

const addFeatures = (payload) => {
  console.log(authHeader());
  return axios.post(ADMIN_URL + "addfeature",payload, {
    headers: {
      ...authHeader(),
    }
     // Set the payload as params
  });
};

const delFeatures = (id) => {
  console.log(authHeader());
  return axios.post(ADMIN_URL + "deletefeaturebyid",id, {
    headers: {
      'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};
const delProduct = (id) => {
  console.log(authHeader());
  return axios.post(ADMIN_URL + "deleteproductbyid",id, {
    headers: {
      'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};

const delparam = (id) => {
  console.log(authHeader());
  return axios.post(ADMIN_URL + "deleteparameterbyid",id, {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};



const getall = () => {
  console.log(authHeader());
  return axios.get(ADMIN_URL + "getallproducts", {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};


const getproductbyid = (id) => {
  console.log(authHeader());
  return axios.get(`${ADMIN_URL}getproductsbyId?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
  });
};




const updateproduct = (productId, updatedProduct) => {
  console.log(authHeader());
  return axios.put(ADMIN_URL + "updateproduct?id=" + productId, updatedProduct, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
  });
};



const getallbyuser = () => {
  console.log(authHeader());
  return axios.get(USER_URL + "getallproducts", {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};


const getproductbyname = (name) => {
  return axios.get(`${USER_URL}getproductbyname?name=${name}`, {
    headers: {
      ...authHeader()
    }
  });
};


const getallmgr = () => {
  console.log(authHeader());
  return axios.get(MANAGER_URL + "getallproducts", {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};



const getproductbyidadmin = (id) => {
  console.log(authHeader());
  return axios.get(`${ADMIN_URL}getproductsbyId?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
  });
};


const getproductbyidmgr = (id) => {
  console.log(authHeader());
  return axios.get(`${MANAGER_URL}getproductbyid?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
  });
};

const addquotation = (payload) => {
  console.log(authHeader());
  return axios.post(MANAGER_URL + "addquotation",payload, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader(),
    }
     // Set the payload as params
  });
};



const getquotation = (id) => {
  console.log(authHeader());
  return axios.get(`${MANAGER_URL}getquotationbyid?id=${id}`, {
    headers: {
      'Content-Type': 'application/json',    
      'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
  });
};

const getproductbynameadmin = (name) => {
  return axios.get(`${ADMIN_URL}getproductsbyName?name=${name}`, {
    headers: {
      ...authHeader()
    }
  });
};
const getproductbynamemgr = (name) => {
  return axios.get(`${MANAGER_URL}getproductbyname?name=${name}`, {
    headers: {
      ...authHeader()
    }
  });
};

const updaterolebyuser = (id, role) => {
  return axios.put(`${ADMIN_URL}users/updaterole?userId=${id}`, role, {
    headers: {
      ...authHeader()
    }
  });
};

const getalluser = () => {
  console.log(authHeader());
  return axios.get(ADMIN_URL + "getallusers", {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};


const getallrole = () => {
  console.log(authHeader());
  return axios.get(ADMIN_URL + "getallroles", {
    headers: {
  'Content-Type':'application/json',    
  'Access-Control-Allow-Origin': '*',
      ...authHeader()
    }
     // Set the payload as params
  });
};




const UserService = {
  getPublicContent,
  getUserBoard,
  getManagerBoard,
  addproduct,
  addFeatures,
  delFeatures,
  delProduct,
  delparam,
  getall,
  getproductbyid,
  updateproduct,
  getallbyuser,
  getproductbyname,
  getallmgr,
  getproductbyidmgr,
  getproductbyidadmin,
  addquotation,
  getquotation,
  getproductbynameadmin,
  getproductbynamemgr,
  updaterolebyuser,
  getalluser,
  getallrole


};




export default UserService;
