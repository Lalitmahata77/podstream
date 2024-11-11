
import { CATEGORY_URL } from "../constraints";
import { apiSlice } from "./apiSlice";

const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        createCategory : builder.mutation({
            query : (data)=>({
                url : `${CATEGORY_URL}`,
                method : "POST",
                body : data
            })
        }),
        deleteCategory : builder.mutation({
            query : (id)=>({
                url : `${CATEGORY_URL}/${id}`,
                method : "DELETE"
            })
        }),
        updateCategory : builder.mutation({
            query : ({updateCategory,categoryId})=>({
                url : `${CATEGORY_URL}/update/${categoryId}`,
                method : "PUT",
                body : updateCategory
            })
        }),
        fetchCategories : builder.query({
            query : ()=>({
                url : `${CATEGORY_URL}/categories`
            })
        }),
        readCategory : builder.query({
            query : (id)=>({
                url : `${CATEGORY_URL}/${id}`
            })
        })
    })
})

export const {useCreateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery,useReadCategoryQuery,useUpdateCategoryMutation} = categoryApiSlice
