import { request } from "~/utils/axiosInstance";

export const getListComment = async (_id) => {
  try {
    const res = await request.get(`videos/${_id}/comments`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const postComment = async (_id, comment) => {
  try {
    const res = await request.post(`videos/${_id}/comments`, comment);
    console.log('comment  in comment service: ',comment  );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export * as commentService from "~/features/comments/services/commentService";
