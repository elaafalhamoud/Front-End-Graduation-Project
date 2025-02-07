import API from "./api";

const endPoints = {
  login: "/auth/local/",
  logout: "logout",
  register: "/auth/local/register",
  fetchIssues: "/issues",
  createIssue: "/issues",
  editIssue: "/issues/",
  getIssueById: "/issues/",
  deleteIssue: "/issues/",
};

export const login = async (identifier, password) => {
  try {
    const response = await API.post(
      endPoints.login,
      {
        identifier: identifier,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error :", error);
    console.error("error logging in:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await API.post(
      endPoints.register,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
    console.error("error register", error.response?.data || error.message);
    throw error;
  }
};

export const getIssues = async () => {
  try {
    const response = await API.get(endPoints.fetchIssues);
    return response.data.data;
  } catch (error) {
    console.error("error fetching data", error.response?.data || error.message);
    throw error;
  }
};

export const createIssue = async (issueData) => {
  try {
    const response = await API.post(endPoints.createIssue, {
      data: issueData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "error creating issue",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const editIssue = async (issueId, updatedData) => {
  try {
    const response = API.put(endPoints.editIssue + `${issueId}`, {
      data: updatedData,
    });
    return response.data;
  } catch (error) {
    console.error(
      "error updating issue",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getIssueById = async (issueId) => {
  try {
    const response = await API.get(endPoints.getIssueById + `${issueId}`);
    return response.data;
  } catch (error) {
    console.error("error in get issue", error.response?.data || error.message);
    throw error;
  }
};

export const deleteIssue = async (issueId) => {
  try {
    const response = await API.delete(endPoints.deleteIssue + `${issueId}`);
    return response;
  } catch (error) {
    console.error("error delete issue", error.response?.data || error.message);
    throw error;
  }
};
