// src/App.tsx
import React, { useState } from "react";
import {
  useUsers,
  useDeleteUser,
  useCreateUser,
  useUpdateUser,
  useUserAndPost,
  usePost,
  useUsersWithPageSize,
} from "./User";
import { Table, Button, Popconfirm } from "antd";
import UserForm from "./Form";
import { User } from "./types";
import {
  QueryClient,
  useInfiniteQuery,
  useIsFetching,
  useIsMutating,
  useQueryClient,
} from "@tanstack/react-query";

const App: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSIze, setPageSIze] = useState<number>(10);
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useUsers();
    const { data: usersWithPageSize = [] } = useUsersWithPageSize({
      page: page || 1,
      pageSize: pageSIze || 3,
    });

  //   const [{ data: userss }, postQuery] = useUserAndPost();

  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: createUser } = useCreateUser();
  const { mutate: updateUser } = useUpdateUser();

  //   const createMuation = useCreateUser();
  //   console.log("usersAndPosts", userss, postQuery);
  //   console.log("usersAndPosts", userss, postQuery?.data);
  //   console.log('users',users);
  //   console.log('posts',posts);
  //   console.log('createMuation',createMuation);
  const isFetchingUsers = useIsFetching({ queryKey: ["users"] });
  const isMutationUsers = useIsMutating({ mutationKey: ["createUser"] });
  console.log("isFetchingUsers", isFetchingUsers);
  console.log("isMutationUsers", isMutationUsers);

  const [currentUser, setCurrentUser] = useState<User>();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Danh sách người dùng</h1>
      <Button
        onClick={() => {
          setPage(page + 1);
        }}
      >
        +1 page
      </Button>
      <Button
        onClick={() => {
          setPageSIze(pageSIze + 1);
        }}
      >
        +1 pageSize
      </Button>
      <Button
        onClick={() => {
          const UserPageSizePrevious = queryClient.getQueryData<User[]>([
            "users",
            1,
            10,
          ]);
          console.log("UserPageSizePrevious", UserPageSizePrevious);
        }}
      >
        lấy data cũ
      </Button>
      <Button
        onClick={() => {
          queryClient.cancelQueries({ queryKey: ["users"] });
        }}
      >
        cancel Query
      </Button>{" "}
      <UserForm
        onSubmit={(values) => {
          if (isEdit) {
            updateUser({
              id: currentUser?.id,
              userData: values,
            });
            setIsEdit(false);
          } else {
            createUser(values);
          }
        }}
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
