const API_URL = "";

interface ApiFetchOptions {
  url: string;
  revalidate?: false | 0 | number;
  headers?: Record<string, string> & { Authorization?: string };
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  withToken?: boolean;
}

const apiFetch = async ({
  url,
  revalidate = false,
  method = "GET",
  data,
  withToken = true,
  ...props
}: ApiFetchOptions) => {
  const apiUrl = `${API_URL}${url}`;
  const headers = {
    "Content-Type": "application/json",
    ...props.headers,
  };

  // if (withToken) {
  // 	if (authenticated) {
  // 		headers['Authorization'] = `Bearer ${token}`;
  // 	}
  // }

  const requestOptions: RequestInit = {
    ...props,
    method,
    headers,
    ...(data && method !== "GET" ? { body: JSON.stringify(data) } : {}),
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      console.error(`failed to fetch api`);
      return {
        ...(response ? await response.json() : {}),
        fetchError: `failed to fetch api`,
      };
    }

    return response.json();
  } catch (error) {
    console.error(`failed to fetch api`);
    return {
      fetchError: `failed to fetch api`,
    };
  }
};

export default apiFetch;
