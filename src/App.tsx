// src/App.tsx
import React, { useState } from "react";
import { useUsers, useDeleteUser, useCreateUser, usePost } from "./User";
import { Table, Button, Popconfirm } from "antd";
import UserForm from "./Form";
import { User } from "./types";

const App: React.FC = () => {
  const { data: users = [], isLoading } = useUsers();
  //   const { data: posts = []
  //     // , isLoading: isLoadingPost
  //  } = usePost();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: createUser } = useCreateUser();
  const createMuation = useCreateUser();

  console.log('createMuation',createMuation);

  const [currentUser, setCurrentUser] = useState<Omit<User, "id">>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  //   console.log('posts', posts);
  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách người dùng</h1>

      <UserForm
        onSubmit={(values) => createUser(values)}
        initialValues={isEdit ? currentUser : { name: "", email: "" }}
      />

      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <Table
          dataSource={users}
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Tên",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Hành động",
              key: "actions",
              render: (_, user: User) => (
                <>
                  <Button
                    onClick={() => {
                      setCurrentUser(user);
                      setIsEdit(true);
                    }}
                  >
                    Sửa
                  </Button>
                  {/* <Button
                    onClick={() => {
                      
                    }}
                  >
                    Lấy dữ liệu từ api
                  </Button> */}
                  <Popconfirm
                    title="Xóa người dùng"
                    description="Bạn có chắc muốn xóa người dùng này?"
                    onConfirm={() => deleteUser(user.id)}
                    okText="Xóa"
                    cancelText="Hủy"
                  >
                    <Button danger>Xóa</Button>
                  </Popconfirm>
                </>
              ),
            },
          ]}
        />
      )}
    </div>
  );
};

export default App;
