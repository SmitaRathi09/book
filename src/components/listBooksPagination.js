import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Input, Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function ListBooksPagination(props) {
  const [allBooks, setAllbooks] = useState([]);
  const [term1, setTerm1] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      fixed: "left",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a, b) => a.year - b.year,
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
      filters: props.common.countryArray,
      onFilter: (value, record) =>
        (record.country ? record.country : "")
          .toLowerCase()
          .indexOf(value.toLowerCase()) === 0,
    },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Pages",
      dataIndex: "pages",
      key: "pages",
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "id",
      render: (id) => <a onClick={() => navigate(`../AddBook/${id}`)}>Edit</a>,
    },
  ];

  useEffect(() => {
    getList(page);
  }, [page]);

  const getList = async (page) => {
    try {
      const listItem = await axios({
        method: "GET",
        url: `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setTotalPages(listItem.data.pagination.totalPages);

      if (listItem.data.data.length > 0) {
        console.log(page + " -- item-- " + listItem.data.data.length);
        setAllbooks(listItem.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  return (
    <div>
      <p style={{ margin: 10 }}>List of books (by pagination)</p>
      <Input
        placeholder="Search by title"
        value={term1}
        onChange={(e) => setTerm1(e.target.value)}
        style={{ width: "50%", margin: 10 }}
      />
      <Button type="primary" onClick={() => navigate(`../AddBook/addNewBook`)}>
        Add Book
      </Button>
      <Table
        style={{ margin: 40 }}
        dataSource={
          term1 == ""
            ? allBooks
            : allBooks.filter(
                (item) =>
                  (item.title ?? "")
                    .toString()
                    .toLowerCase()
                    .indexOf(term1.toLowerCase()) > -1
              )
        }
        columns={columns}
        bordered
        pagination={false}
      />

      <div style={{ display: "flex", justifyContent: "center", margin: 20 }}>
        {page != 1 && (
          <button onClick={() => handleChangePage(page - 1)}>Previous</button>
        )}
        {page != totalPages && (
          <button onClick={() => handleChangePage(page + 1)}>Next</button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};
function mapDispatchToProps(dispatch) {}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListBooksPagination);
