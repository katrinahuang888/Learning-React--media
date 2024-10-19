import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const albumsApi = createApi({
    reducerPath: 'albums',
    baseQuery: fetchBaseQuery({
        // gives us a pre-configured version of fetch
        // the only thing we need to pass into it is the baseURL
        // baseURL: the root URL of the server we want to make requests to
        // basically...where is our server hosted?
        baseUrl: 'http://localhost:3005',
        // remove for production
        fetchFn: async (...args) => {
            await pause(1000);
            return fetch(...args);
        }
    }),
    endpoints(builder) {
        return {
            removeAlbum: builder.mutation({
                invalidatesTags: (result, error, album) => {
                    return [{ type: 'Album', id: album.id }];
                },
                query: (album) => {
                    return {
                        url: `/albums/${album.id}`,
                        method: 'DELETE',
                    };
                },
            }),
            addAlbum: builder.mutation({
                invalidatesTags: (result, error, user) => {
                    return [{ type: 'UsersAlbums', id: user.id }]
                },
                // tells RTK about some parameters to use for the request
                query: (user) => {
                    return {
                        url: '/albums',
                        method: 'POST',
                        body: {
                            userId: user.id,
                            title: faker.commerce.productName()
                        },
                    };
                },
            }),
            fetchAlbums: builder.query({
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id}
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });
                    return tags;
                },
                query: (user) => {
                    // some data that came back from JSON server
                    return {
                        url: 'albums',
                        params: {
                            userId: user.id, 
                        },
                        method: 'GET',
                    };
                }
            }),
        };
    },
});

export const { 
    useFetchAlbumsQuery, 
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} = albumsApi;

export { albumsApi };