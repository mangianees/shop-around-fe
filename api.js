import axios from "axios";

const shopAround = axios.create({
  baseURL: "https://shop-around-be.onrender.com/api/",
  // withCredentials: true,  // Include credentials if needed
});



export const getStores = (lat,lng,rad) => {
  console.log('getStores is being invoked');
  const params = {params: {rad}}
  return shopAround.get(`stores/${lat}/${lng}`, params)

    .then(( {data} ) => {
      console.log(data)
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getStoresById = (id) => {
  console.log('getStoresById is being invoked');
  return shopAround.get(`stores/${id}`)
    .then(( {data} ) => {
      console.log(data)
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getProducts = () => {
  // console.log('getProducts is being invoked now');


  return shopAround.get(`products`)

    .then(( {data} ) => {
      // console.log(data, 'here is all the data');
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getCoordinatesFromPostCode = async (postcode) => {
  const API_KEY = "AIzaSyDug2H25Ibza9XgkDvk3zLtEWwbxK0LCxA";
  console.log('postcode ',postcode);

  return (response = await axios
    .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
      params: {
        address: postcode,
        key: API_KEY,
      },
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    }));
};


export const getUsers = (user_id) => {
  console.log('GETUSERS is being invoked');
  return shopAround
    .get(`users/${user_id}`)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};


export const updateUser = (updatedUserFields,user_id) => {
  const {email, username} = updatedUserFields;
  body = {email, username}
  console.log("Updated User is being invoked", body, user_id);
  return shopAround
    .patch(`users/${user_id}/`, body)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};


export const postPrice =(body)=>{
  return shopAround.post("prices/", body)
  .then(({data})=>{
    return data
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });
}

export const getLocalPrices =(product_id, lat, lng, rad)=>{
  return shopAround.get(`price-report/${product_id}/${lat}/${lng}/${rad}`)
  .then(({data})=>{
    return data
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });
}

export const getFavouritesByUserId =(user_id)=>{
  return shopAround.get(`users/${user_id}/favourites`)
  .then(({data})=>{
    return data
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });
}

export const deleteFavourite=(fav_product_id)=>{
  return shopAround.delete(`favourites/${fav_product_id}/`)
  .catch((error) => {
    console.error("An error occurred:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });
}

export const addToFavourites=(product_id, user_id)=>{
  const body = {
    product:product_id,
    user: user_id
  }
  return shopAround.post(`favourites/`, body)
  .then(({data})=>{
    return data
  })
  .catch((error) => {
    console.error("An error occurred:", error);
    console.error(
      "Error details:",
      error.response ? error.response.data : error.message
    );
    throw error;
  });

}


// export const getTopics = () => {
//   return shopAround.get("/topics").then(({ data }) => {
//     return data;
//   });
// };

// export const patchArticle = (articleId, increment) => {
//   return shopAround
//     .patch(`articles/${articleId}`, {
//       inc_votes: increment,
//     })
//     .then(({ data }) => {
//       return data;
//     });
// };

// export const postComment = (articleId, commentObj) => {
//   return shopAround
//     .post(`/articles/${articleId}/comments`, { comment: commentObj })
//     .then(({ data }) => {
//       return data;
//     });
// };

// export const deleteComment = (commentIdToDelete) => {
//   return shopAround
//   .delete(`/comments/${commentIdToDelete}`);
// };
