import { USERS_URL } from "../constraint";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        register : builder.mutation({
            query : (data) =>({
                url : `${USERS_URL}`,
                method : "POST",
                body : data
            })
        }),
        login : builder.mutation({
            query : (data)=>({
                url : `${USERS_URL}/login`,
                method : "POST",
                body : data
            })
        }),
        logout : builder.mutation({
            query : ()=>({
                url : `${USERS_URL}/logout`,
                method : "POST"
            })
        }),
        users : builder.query({
            query : ()=>({
                url : `${USERS_URL}/users`
            })
        }),
        profile : builder.query({
            query : (id)=>({
                url : `${USERS_URL}/${id}`
            })
        }),
        updateUser : builder.mutation({
            query : ({data,id})=>({
                url : `${USERS_URL}/update/${id}`,
                method : "PUT",
                body : data
            })
        })
    })
})

export const {useRegisterMutation,useLoginMutation,useLogoutMutation,useUsersQuery,useUpdateUserMutation,useProfileQuery} = userApiSlice
