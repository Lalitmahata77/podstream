import { PODCAST_URL,UPLOAD_URL } from "../constraints";
import { apiSlice } from "./apiSlice";

const podcastApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder)=>({
        getPodcast : builder.query({
            query : (keyboard)=>({
                url : `${PODCAST_URL}`,
                params : {keyboard}
            }),
            keepUnusedDataFor : 5
        }),
        getPodcastById : builder.query({
            query : (id)=>({
                url : `${PODCAST_URL}/${id}`,
                providesTags: (result, error, id) => [
                    { type: "Podcast", id: id },
                  ],
            })
        }),
        allPodcast : builder.query({
            query : ()=>({
                url : `${PODCAST_URL}/podcasts`
            })
        }),
        getPodcastDetails : builder.query({
            query : (podcastId)=>({
                url : `${PODCAST_URL}/${podcastId}`
            }),
            keepUnusedDataFor : 5
        }),
        createPodcast : builder.mutation({
            query : (podcastData)=>({
                url : `${PODCAST_URL}`,
                method : "POST",
                body : podcastData
            })
        }),
        updatePodcast : builder.mutation({
            query : ({FormData,podcastId})=>({
                url : `${PODCAST_URL}/${podcastId}`,
                method : "PUT",
                body : FormData
            })
        }),
        uploadPodcastImage  : builder.mutation({
            query : (data)=>({
                url : `${UPLOAD_URL}`,
                method : "POST",
                body : data
            })
        }),
        deletePodcast : builder.mutation({
            query : (id)=>({
                url : `${PODCAST_URL}/${id}`,
                method : "DELETE"
            })
        }),
        createReview : builder.mutation({
            query : (data)=>({
                url : `${PODCAST_URL}/${data.podcastId}/review`,
                method : "POST",
                body : data
            })
        }),
        getTopPodcast : builder.query({
            query : ()=>({
                url : `${PODCAST_URL}/toppodcast`
            })
        }),
        getNewPodcast : builder.mutation({
            query : ()=>({
                url : `${PODCAST_URL}/newpodcast`
            })
        }),
        getFilteredPodcast: builder.query({
            query: ({ checked, radio }) => ({
              url: `${PODCAST_URL}/filtered-products`,
              method: "POST",
              body: { checked, radio },
            }),
          }),
    })
})

export const {useGetPodcastQuery,useAllPodcastQuery,useCreatePodcastMutation,useCreateReviewMutation,useDeletePodcastMutation,useGetFilteredPodcastQuery,useGetNewPodcastMutation,useGetPodcastByIdQuery,useGetPodcastDetailsQuery,useGetTopPodcastQuery,useUploadPodcastImageMutation,useUpdatePodcastMutation} = podcastApiSlice