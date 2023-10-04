import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function ListBooks(props) {
  const [allBooks, setAllbooks] = useState([]);
  const [term, setTerm] = useState("");
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
    const getList = async () => {
      let allData = [];
      let page = 1;
      let lastPage = false;
      do {
        try {
          const listItem = await axios({
            method: "GET",
            url: `http://68.178.162.203:8080/application-test-v1.1/books?page=${page}`,
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (listItem.data.pagination.totalPages >= page) {
            if (listItem.data.data.length > 0) {
              console.log(page + " -- item-- " + listItem.data.data.length);
              allData = allData.concat(listItem.data.data);
              page++;
            }
          } else {
            lastPage = true;
          }
        } catch (err) {
          console.log(err);
        }
      } while (!lastPage);
      setAllbooks(allData);
    };
    getList();
  }, []);

  return (
    <div>
      <p style={{ margin: 10 }}>List of books (All books)</p>
      <Input
        placeholder="Search by title"
        onChange={(e) => setTerm(e.target.value)}
        style={{ width: "50%", margin: 10 }}
        value={term}
      />
      <Button type="primary" onClick={() => navigate(`../AddBook/addNewBook`)}>
        Add Book
      </Button>
      <Table
        style={{ margin: 40 }}
        dataSource={
          term == ""
            ? allBooks
            : allBooks.filter(
                (item) =>
                  (item.title ?? "")
                    .toString()
                    .toLowerCase()
                    .indexOf(term.toLowerCase()) > -1
              )
        }
        columns={columns}
        bordered
      />
      ;
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};
function mapDispatchToProps(dispatch) {
  return {};
}
export default connect(mapStateToProps, mapDispatchToProps)(ListBooks);
