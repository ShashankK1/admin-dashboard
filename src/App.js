import { Box } from "@mui/material";
import Header from "./molecules/Header";
import Body from "./molecules/Body";
import { useEffect, useState } from "react";
const url = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
function App() {

  const [data, setData] = useState({ loading: true, data: null });
  const [searchData, setSearchData] = useState([]);

  const fetchData = async () => {
    try {
      const rawRes = await fetch(url);
      const jsonRes = await rawRes.json();
      return jsonRes;
    } catch (err) {
      return [];
    }
  }

  useEffect(() => {
    fetchData().then(data => {
      setData({ loading: false, data });
      setSearchData(data)
    })
  }, []);

  const handleSearch = (input, filter) => {
    if (!filter) {
      setSearchData(data.data);
    }
    if (input?.length > 0 && filter) {
      console.log(data.data);
      const filteredData = data.data.filter((item) => (
        item.name.toLowerCase().includes(input.toLowerCase()) ||
        item.email.toLowerCase().includes(input.toLowerCase()) ||
        item.role.toLowerCase().includes(input.toLowerCase())
      )
      );
      setSearchData(filteredData);
    }
  }

  const deleteHandler = (params) => {
    const filter = searchData.filter((item) => item.id !== params.id);
    setSearchData(filter);
    setData(prev => ({ ...prev, data: prev.data.filter((item) => item.id !== params.id) }));
  }

  const deleteAll = () => {
    setData({ loading: false, data: [] });
    setSearchData([])
  }

  const deleteSelectHandler = (arrOfId) => {
    let newData = data.data;
    arrOfId.map((id) => {
      newData = newData.filter((item) => item.id != id);
      setData(prev => ({ ...prev, data: newData }));
      setSearchData(newData);
    })
    console.log(newData);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header handleSearch={handleSearch} deleteAll={deleteAll} />
      {
        data.loading ?
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            Loading...
          </Box> :
          <Body data={searchData} deleteHandler={deleteHandler} deleteSelectHandler={deleteSelectHandler} />
      }

    </Box>
  );


}

export default App;
