// src/hooks/useUser.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createUser,
  deleteUser,
  getPost,
  getUsers,
  updateUser,
  getDetailUser,
} from "./api";
import { User } from "./types";

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useDetailUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ["user", id],
    queryFn: () => getDetailUser(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 phút
    refetchOnWindowFocus: false,
  });
};

export const usePost = () => {
  return useQuery<User[], Error>({
    queryKey: ["posts"],
    queryFn: getPost,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, Omit<User, "id">>({
    mutationFn: createUser,
    // // Bước 1: Cập nhật dữ liệu tạm thời (optimistic update)
    // onMutate: async (newUserData) => {
    //   // Dừng refetch để tránh conflict
    //   await queryClient.cancelQueries({ queryKey: ["users"] });

    //   // Lấy dữ liệu hiện tại từ cache
    //   const previousUsers = queryClient.getQueryData<User[]>(["users"]) || [];

    //   // Tạo ID tạm thời (UUID hoặc số âm để phân biệt với ID thật)
    //   const tempId = Math.random(); // Ví dụ: "a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8"

    //   // Tạo user tạm thời
    //   const optimisticUser: User = {
    //     id: tempId, // ID giả
    //     ...newUserData,
    //   };

    //   // Cập nhật cache với user tạm thời
    //   queryClient.setQueryData(["users"], [...previousUsers, optimisticUser]);

    //   // Trả về context để rollback nếu có lỗi
    //   return { previousUsers, optimisticUser };
    // },
    // // Bước 2: Xử lý thành công (thay user tạm bằng user thật từ server)
    // onSuccess: (serverResponse, _variables, context) => {
    //   const { optimisticUser } = context!;

    //   console.log('object',serverResponse, _variables, context);
    //     console.log('optimisticUser',optimisticUser);
    //   // Cập nhật lại cache với dữ liệu từ server (thay ID tạm bằng ID thật)
    //   queryClient.setQueryData<User[]>(["users"], (oldUsers) =>
    //     oldUsers!.map((user) =>
    //       user.id === optimisticUser.id ? serverResponse : user
    //     )
    //   );
    // },

    // // Bước 3: Xử lý lỗi (rollback về trạng thái trước)
    // onError: (_error, _variables, context) => {
    //   queryClient.setQueryData(["users"], (context as any).previousUsers);
    // },

    // // Bước 4: Luôn chạy (có thể refetch để đảm bảo dữ liệu mới nhất)
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["users"] });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Refetch dữ liệu 
      queryClient.refetchQueries({ queryKey: ["users"] }); // Refetch dữ liệu ngay lập tức
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, { id: number; userData: Partial<User> }>({
    mutationFn: ({ id, userData }) => updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
